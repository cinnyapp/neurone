import {
  EphemeralEvent,
  TypingEphemeralEvent,
  ReceiptEphemeralEvent,
} from "../../../../api/types";
import { JoinedRoom } from "../../../../api/matrix/client/v3/sync";

export const roomEphemeral = (joinedRoom: JoinedRoom): EphemeralEvent[] =>
  joinedRoom.ephemeral?.events ?? [];

export const roomTypingEphemeral = (
  events: EphemeralEvent[],
): TypingEphemeralEvent | undefined =>
  events.find<TypingEphemeralEvent>(
    (event): event is TypingEphemeralEvent => event.type === "m.typing",
  );

export const roomReceiptEphemeral = (
  events: EphemeralEvent[],
): ReceiptEphemeralEvent | undefined =>
  events.find<ReceiptEphemeralEvent>(
    (event): event is ReceiptEphemeralEvent => event.type === "m.receipt",
  );
