import {
  DecryptionSettings,
  MegolmDecryptionError as RustMegolmDecryptionError,
  DecryptionErrorCode as RustDecryptionErrorCode,
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
    | [MegolmDecryptionError, undefined]
    | [
        undefined,
        T extends StateEventWithoutRoomId
          ? StateEventWithoutRoomId
          : MessageEventWithoutRoomId,
      ]
  > {
    const decryptionSettings = new DecryptionSettings(
      TrustRequirement.Untrusted,
    );

    try {
      const decryptedEvent = await this.olmMachine.decryptRoomEvent(
        JSON.stringify(encryptedEvent),
        new RoomId(roomId),
        decryptionSettings,
      );
      const event = JSON.parse(decryptedEvent.event);

      return [undefined, event];
    } catch (e) {
      if (e instanceof RustMegolmDecryptionError) {
        return [new MegolmDecryptionError(e), undefined];
      }
      throw e;
    }
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

type DecryptionErrorCode =
  | "missing-room-key"
  | "unknown-message-index"
  | "mismatched-identity-keys"
  | "unknown-sender-device"
  | "unsigned-sender-device"
  | "sender-identity-verification-violation"
  | "unable-to-decrypt"
  | "mismatched-sender";

export class MegolmDecryptionError {
  private readonly error: RustMegolmDecryptionError;

  constructor(error: RustMegolmDecryptionError) {
    this.error = error;
  }

  get code(): DecryptionErrorCode {
    return decryptionErrorCodeFromRust(this.error.code);
  }

  get description(): string {
    return this.error.description;
  }

  get withheldCode(): string | undefined {
    return this.error.withheldCode;
  }

  get withheldDescription(): string | undefined {
    return this.error.maybe_withheld;
  }
}

export function decryptionErrorCodeFromRust(
  code: RustDecryptionErrorCode,
): DecryptionErrorCode {
  switch (code) {
    case RustDecryptionErrorCode.MissingRoomKey:
      return "missing-room-key";

    case RustDecryptionErrorCode.UnknownMessageIndex:
      return "unknown-message-index";

    case RustDecryptionErrorCode.MismatchedIdentityKeys:
      return "mismatched-identity-keys";

    case RustDecryptionErrorCode.UnknownSenderDevice:
      return "unknown-sender-device";

    case RustDecryptionErrorCode.UnsignedSenderDevice:
      return "unsigned-sender-device";

    case RustDecryptionErrorCode.SenderIdentityVerificationViolation:
      return "sender-identity-verification-violation";

    case RustDecryptionErrorCode.UnableToDecrypt:
      return "unable-to-decrypt";

    case RustDecryptionErrorCode.MismatchedSender:
      return "mismatched-sender";

    default: {
      const exhaustiveCheck: never = code;
      throw new Error(`Unknown decryption error code: ${exhaustiveCheck}`);
    }
  }
}
