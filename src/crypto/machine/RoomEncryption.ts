import {
  DecryptionSettings,
  OlmMachine,
  RoomId,
  TrustRequirement,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import {
  eventEncryptionInfoFromRust,
  roomEncryptionSettingsFromRust,
  roomEncryptionSettingsToRust,
} from "./utils";
import { EventEncryptionInfo, RoomEncryptionSettings } from "./types";
import {
  ClientEventWithoutRoomId,
  MessageEventWithoutRoomId,
  StateEventWithoutRoomId,
} from "../../api/types";

export class RoomEncryption {
  private readonly olmMachine: OlmMachine;

  constructor(olmMachine: OlmMachine) {
    this.olmMachine = olmMachine;
  }

  async encryptMessageEvent(
    roomId: string,
    eventType: string,
    content: object,
  ): Promise<string> {
    const cipherText = await this.olmMachine.encryptRoomEvent(
      new RoomId(roomId),
      eventType,
      JSON.stringify(content),
    );

    return cipherText;
  }

  async encryptStateEvent(
    roomId: string,
    eventType: string,
    stateKey: string,
    content: object,
  ): Promise<string> {
    const cipherText = await this.olmMachine.encryptStateEvent(
      new RoomId(roomId),
      eventType,
      stateKey,
      JSON.stringify(content),
    );

    return cipherText;
  }

  async decryptEvent<T extends ClientEventWithoutRoomId>(
    roomId: string,
    encryptedEvent: T,
  ): Promise<
    T extends StateEventWithoutRoomId
      ? StateEventWithoutRoomId
      : MessageEventWithoutRoomId
  > {
    const decryptionSettings = new DecryptionSettings(
      TrustRequirement.Untrusted,
    );

    const decryptedEvent = await this.olmMachine.decryptRoomEvent(
      JSON.stringify(encryptedEvent),
      new RoomId(roomId),
      decryptionSettings,
    );

    const event = JSON.parse(decryptedEvent.event);

    return event;
  }

  async getEventEncryptionInfo(
    roomId: string,
    event: ClientEventWithoutRoomId,
  ): Promise<EventEncryptionInfo> {
    const info = await this.olmMachine.getRoomEventEncryptionInfo(
      JSON.stringify(event),
      new RoomId(roomId),
    );

    return eventEncryptionInfoFromRust(info);
  }

  async removeSession(roomId: string): Promise<void> {
    await this.olmMachine.invalidateGroupSession(new RoomId(roomId));
  }

  async getSettings(
    roomId: string,
  ): Promise<RoomEncryptionSettings | undefined> {
    const settings = await this.olmMachine.getRoomSettings(new RoomId(roomId));

    if (!settings) return undefined;

    return roomEncryptionSettingsFromRust(settings);
  }

  async setSettings(
    roomId: string,
    settings: RoomEncryptionSettings,
  ): Promise<void> {
    await this.olmMachine.setRoomSettings(
      new RoomId(roomId),
      roomEncryptionSettingsToRust(settings),
    );
  }
}
