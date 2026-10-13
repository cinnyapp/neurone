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

import { OlmMachine } from "@matrix-org/matrix-sdk-crypto-wasm";
import { Observable } from "../../utils/observable";
import { encryptionAlgorithmFromRust } from "./utils";
import { RoomKeyInfo, RoomKeyWithheldInfo } from "./types";

export class MachineEvents {
  private readonly olmMachine: OlmMachine;

  private readonly publishKey = Math.random().toString();

  public readonly onDevicesUpdated = new Observable<string[]>(this.publishKey);

  public readonly onReceiveSecret = new Observable<{
    name: string;
    value: string;
  }>(this.publishKey);

  public readonly onRoomKeysUpdated = new Observable<RoomKeyInfo[]>(
    this.publishKey,
  );

  public readonly onRoomKeysWithheld = new Observable<RoomKeyWithheldInfo[]>(
    this.publishKey,
  );

  public readonly onUserIdentityUpdated = new Observable<string>(
    this.publishKey,
  );

  constructor(olmMachine: OlmMachine) {
    this.olmMachine = olmMachine;

    this.olmMachine.registerDevicesUpdatedCallback(async (userIds) => {
      this.onDevicesUpdated.publish(this.publishKey, userIds);
    });

    this.olmMachine.registerReceiveSecretCallback(async (name, value) => {
      this.onReceiveSecret.publish(this.publishKey, { name, value });
    });

    this.olmMachine.registerRoomKeyUpdatedCallback(async (infos) => {
      const roomKeyInfos = infos
        .map((info) => {
          const algorithm = encryptionAlgorithmFromRust(info.algorithm);
          if (algorithm === undefined) return undefined;

          const roomKeyInfo: RoomKeyInfo = {
            algorithm,
            roomId: info.roomId.toString(),
            senderKey: info.senderKey.toBase64(),
            sessionId: info.sessionId,
          };
          return roomKeyInfo;
        })
        .filter((info) => info !== undefined);

      this.onRoomKeysUpdated.publish(this.publishKey, roomKeyInfos);
    });

    this.olmMachine.registerRoomKeysWithheldCallback(async (infos) => {
      const roomKeyInfos = infos
        .map((info) => {
          const algorithm = encryptionAlgorithmFromRust(info.algorithm);
          if (algorithm === undefined) return undefined;

          const roomKeyWithheldInfo: RoomKeyWithheldInfo = {
            algorithm,
            roomId: info.roomId.toString(),
            sender: info.sender.toString(),
            sessionId: info.sessionId,
            withheldCode: info.withheldCode,
          };
          return roomKeyWithheldInfo;
        })
        .filter((info) => info !== undefined);

      this.onRoomKeysWithheld.publish(this.publishKey, roomKeyInfos);
    });

    this.olmMachine.registerUserIdentityUpdatedCallback(async (id) => {
      this.onUserIdentityUpdated.publish(this.publishKey, id.toString());
    });
  }
}
