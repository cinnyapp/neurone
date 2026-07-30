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
