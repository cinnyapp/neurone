import {
  BackupDecryptionKey,
  OlmMachine,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { Base64, ObjectReader } from "../../../utils";
import { BackupVersionInfo } from "../../../api/types";
import { OutgoingRequests } from "../OutgoingRequests";
import { KeyBackup } from "./KeyBackup";

export class BackupManager {
  private readonly olmMachine: OlmMachine;

  private readonly outgoingRequests: OutgoingRequests;

  /**
   * Generates a new Matrix backup key pair.
   *
   * The returned public key should be uploaded as part of the backup metadata,
   * while the private key (recovery key) must be securely stored by the user.
   *
   * @returns An object containing the base64-encoded public and private keys.
   */
  static createBackupKey() {
    const key = BackupDecryptionKey.createRandomKey();
    const publicKey = key.megolmV1PublicKey.publicKeyBase64;
    const privateKey = key.toBase64();

    return {
      publicKey,
      privateKey,
    };
  }

  /**
   * Checks whether a recovery key matches the given backup.
   *
   * This verifies that:
   * - the backup uses the supported Megolm backup algorithm, and
   * - the recovery key derives the same public key as the backup metadata.
   *
   * @param backupInfo The backup metadata.
   * @param secret The base64-encoded recovery key.
   * @returns True if the recovery key belongs to the backup; otherwise false.
   */
  static validDecryptionKey(
    backupInfo: BackupVersionInfo,
    secret: string,
  ): boolean {
    const decryptionKey = BackupDecryptionKey.fromBase64(secret);

    if (backupInfo.algorithm !== "m.megolm_backup.v1.curve25519-aes-sha2")
      return false;

    const publicKey = ObjectReader.string(backupInfo.auth_data, "public_key");
    if (!publicKey) return false;

    return publicKey === decryptionKey.megolmV1PublicKey.publicKeyBase64;
  }

  constructor(olmMachine: OlmMachine, outgoingRequests: OutgoingRequests) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = outgoingRequests;
  }

  /**
   * Determines whether a backup can be trusted.
   *
   * A backup is considered trusted if:
   * - it is signed by a trusted device, or
   * - the locally stored backup decryption key matches the backup's public key.
   *
   * @param backupInfo Backup version information from the server.
   * @returns True if the backup is trusted; otherwise false.
   */
  async trustedBackup(backupInfo: BackupVersionInfo): Promise<boolean> {
    const signInfo = await this.olmMachine.verifyBackup(backupInfo);
    if (signInfo.trusted()) {
      return true;
    }

    const { decryptionKey } = await this.olmMachine.getBackupKeys();
    if (!decryptionKey) return false;

    return BackupManager.validDecryptionKey(
      backupInfo,
      decryptionKey.toBase64(),
    );
  }

  /**
   * Enables key backup for the specified backup version.
   *
   * This configures the Olm machine to encrypt and upload future room keys
   * using the backup's public key. A private/decryption key is not required
   * for enabling uploads.
   *
   * @param backupInfo Backup version information containing the public key.
   * @returns A KeyBackup instance for interacting with the enabled backup.
   * @throws If the backup metadata does not contain a public key.
   */
  async enableBackup(backupInfo: BackupVersionInfo): Promise<KeyBackup> {
    const publicKey = ObjectReader.string(backupInfo.auth_data, "public_key");
    if (!publicKey) {
      throw new Error("Missing public_key in backup info!");
    }

    await this.olmMachine.enableBackupV1(publicKey, backupInfo.version);

    const keyBackup = new KeyBackup(
      this.olmMachine,
      this.outgoingRequests,
      backupInfo,
    );

    return keyBackup;
  }

  /**
   * Disables key backup.
   *
   * After calling this method, the client will stop encrypting and uploading
   * new room keys to the configured backup.
   */
  async disableBackup(): Promise<void> {
    await this.olmMachine.disableBackup();
  }

  /**
   * Validates and stores a backup decryption (recovery) key locally.
   *
   * The provided recovery key must correspond to the supplied backup version.
   * Once stored, it can be used to restore encrypted room keys from the backup
   * and to verify that the backup belongs to the current user.
   *
   * @param key The raw backup decryption key bytes.
   * @param backupInfo The backup metadata the recovery key is expected to match.
   *
   * @throws {Error} If the provided recovery key does not match the supplied backup.
   */
  async saveDecryptionKey(
    key: Uint8Array<ArrayBuffer>,
    backupInfo: BackupVersionInfo,
  ): Promise<void> {
    const secret = Base64.encode(key);
    if (!BackupManager.validDecryptionKey(backupInfo, secret)) {
      throw new Error(
        "The provided backup recovery key does not match the backup.",
      );
    }

    const decryptionKey = BackupDecryptionKey.fromBase64(secret);

    await this.olmMachine.saveBackupDecryptionKey(
      decryptionKey,
      backupInfo.version,
    );
  }
}
