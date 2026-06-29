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

  static createBackupKey() {
    const key = BackupDecryptionKey.createRandomKey();
    const publicKey = key.megolmV1PublicKey.publicKeyBase64;
    const privateKey = key.toBase64();

    return {
      publicKey,
      privateKey,
    };
  }

  constructor(olmMachine: OlmMachine, outgoingRequests: OutgoingRequests) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = outgoingRequests;
  }

  async trustedBackup(backupInfo: BackupVersionInfo): Promise<boolean> {
    const signInfo = await this.olmMachine.verifyBackup(backupInfo);
    if (signInfo.trusted()) {
      return true;
    }

    const { decryptionKey } = await this.olmMachine.getBackupKeys();
    if (!decryptionKey) return false;

    return KeyBackup.validDecryptionKey(backupInfo, decryptionKey);
  }

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

  async disableBackup(): Promise<void> {
    await this.olmMachine.disableBackup();
  }

  async saveDecryptionKey(key: Uint8Array, version: string): Promise<void> {
    const decryptionKey = BackupDecryptionKey.fromBase64(Base64.encode(key));

    await this.olmMachine.saveBackupDecryptionKey(decryptionKey, version);
  }
}
