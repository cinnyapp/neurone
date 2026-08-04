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
import { MegolmSessionData, RoomKeysImportResult } from "./types";
import { ObjectReader } from "../../../utils";
import { OutgoingRequests } from "../OutgoingRequests";

export class KeyBackup {
  private readonly olmMachine: OlmMachine;

  private readonly outgoingRequests: OutgoingRequests;

  public readonly backupInfo: BackupVersionInfo;

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
  ): Promise<RoomKeysImportResult> {
    const { decryptionKey } = await this.olmMachine.getBackupKeys();

    if (!decryptionKey) {
      throw new Error("KeyBackup decryption key not found!");
    }

    const decryptedKeys = await this.decryptRoomKeys(
      decryptionKey,
      roomToKeyBackup,
    );

    const r = await this.olmMachine.importBackedUpRoomKeys(
      decryptedKeys,
      progress,
      this.backupInfo.version,
    );

    return {
      imported: r.importedCount,
      total: r.totalCount,
    };
  }
}
