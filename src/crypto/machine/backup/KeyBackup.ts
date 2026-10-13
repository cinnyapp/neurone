/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
import {
  BackupRoomKeysResult,
  MegolmSessionData,
  RoomKeysImportResult,
} from "./types";
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
      decryptedData.session_id = sessionId;
      keys.set(sessionId, decryptedData);
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

  public async backupRoomKeys(): Promise<BackupRoomKeysResult | undefined> {
    const request = await this.olmMachine.backupRoomKeys();
    if (!request) {
      return;
    }

    const keyBackup: Record<string, RoomKeyBackup> = JSON.parse(request.body);

    let uploaded = 0;
    for (const { sessions } of Object.values(keyBackup.rooms)) {
      uploaded += Object.keys(sessions).length;
    }

    const response = await this.outgoingRequests.send(request);

    return {
      uploaded,
      response,
    };
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
