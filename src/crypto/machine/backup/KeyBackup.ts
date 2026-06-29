import {
  BackupDecryptionKey,
  OlmMachine,
  RoomId,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import {
  BackupVersionInfo,
  KeyBackupData,
  RoomKeyBackup,
} from "../../../api/types";
import { MegolmSessionData } from "./types";
import { ObjectReader } from "../../../utils";
import { OutgoingRequests } from "../OutgoingRequests";

export class KeyBackup {
  private readonly olmMachine: OlmMachine;

  private readonly outgoingRequests: OutgoingRequests;

  public readonly backupInfo: BackupVersionInfo;

  static validDecryptionKey(
    backupInfo: BackupVersionInfo,
    decryptionKey: BackupDecryptionKey,
  ): boolean {
    if (backupInfo.algorithm !== "m.megolm_backup.v1.curve25519-aes-sha2")
      return false;

    const publicKey = ObjectReader.string(backupInfo.auth_data, "public_key");
    if (!publicKey) return false;

    return publicKey === decryptionKey.megolmV1PublicKey.publicKeyBase64;
  }

  constructor(
    olmMachine: OlmMachine,
    outgoingRequests: OutgoingRequests,
    backupInfo: BackupVersionInfo,
  ) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = outgoingRequests;
    this.backupInfo = backupInfo;
  }

  private async decryptSessions(
    decryptionKey: BackupDecryptionKey,
    sessions: Record<string, KeyBackupData>,
  ): Promise<Map<string, MegolmSessionData>> {
    const keys = new Map<string, MegolmSessionData>();

    for (const [sessionId, data] of Object.entries(sessions)) {
      const sessionData = ObjectReader.object(data, "session_data");

      const ephemeral = ObjectReader.string(sessionData, "ephemeral");
      const mac = ObjectReader.string(sessionData, "mac");
      const ciphertext = ObjectReader.string(sessionData, "ciphertext");

      if (!ephemeral || !mac || !ciphertext) {
        console.warn(
          `BackupManager: Invalid session data. ID: ${sessionId} Data: ${data}`,
        );
        continue;
      }

      const decrypted = decryptionKey.decryptV1(ephemeral, mac, ciphertext);

      const decryptedData = JSON.parse(decrypted);
      if (ObjectReader.string(decryptedData, "session_id") === sessionId) {
        keys.set(sessionId, decryptedData);
      }
    }

    return keys;
  }

  private async decryptRoomKeys(
    decryptionKey: BackupDecryptionKey,
    roomToKeyBackup: Record<string, RoomKeyBackup>,
  ): Promise<Map<RoomId, Map<string, MegolmSessionData>>> {
    const roomKeys = new Map<RoomId, Map<string, MegolmSessionData>>();

    for (const [roomId, backup] of Object.entries(roomToKeyBackup)) {
      const { sessions } = backup;

      const keys = await this.decryptSessions(decryptionKey, sessions);
      roomKeys.set(new RoomId(roomId), keys);
    }

    return roomKeys;
  }

  public async onSecret(secret: string): Promise<void> {
    const decryptionKey = BackupDecryptionKey.fromBase64(secret);
    if (!KeyBackup.validDecryptionKey(this.backupInfo, decryptionKey)) {
      console.warn("Invalid key-backup decryption key received!");
      return;
    }

    await this.olmMachine.saveBackupDecryptionKey(
      decryptionKey,
      this.backupInfo.version,
    );
  }

  public async backupRoomKeys(): Promise<Response | undefined> {
    const request = await this.olmMachine.backupRoomKeys();
    if (!request) {
      return;
    }

    return this.outgoingRequests.send(request);
  }

  async importBackup(
    roomToKeyBackup: Record<string, RoomKeyBackup>,
    progress: (progress: bigint, total: bigint, failures: bigint) => void,
  ): Promise<void> {
    const { decryptionKey } = await this.olmMachine.getBackupKeys();

    if (!decryptionKey) {
      throw new Error("KeyBackup decryption key not found!");
    }

    const decryptedKeys = await this.decryptRoomKeys(
      decryptionKey,
      roomToKeyBackup,
    );

    await this.olmMachine.importBackedUpRoomKeys(
      decryptedKeys,
      progress,
      this.backupInfo.version,
    );
  }
}
