import { JoinedRoom } from "../../../api/matrix/client/v3/sync/sync.type";
import {
  ReceiptEphemeralEvent,
  RoomEventReceipts,
  RoomTyping,
  TypingEphemeralEvent,
} from "./roomEphemeral.type";

export const serializeRoomTyping = (
  roomId: string,
  joinedRoom: JoinedRoom,
): RoomTyping => {
  const typingEvent = joinedRoom.ephemeral?.events?.find<TypingEphemeralEvent>(
    (evt): evt is TypingEphemeralEvent => evt.type === "m.typing",
  );

  const roomTyping: RoomTyping = {
    roomId,
    userIds: typingEvent?.content.user_ids ?? [],
  };
  return roomTyping;
};

export const serializeRoomReceipt = (
  roomId: string,
  joinedRoom: JoinedRoom,
): RoomEventReceipts[] => {
  const receiptEvent =
    joinedRoom.ephemeral?.events?.find<ReceiptEphemeralEvent>(
      (evt): evt is ReceiptEphemeralEvent => evt.type === "m.receipt",
    );

  if (!receiptEvent) {
    return [];
  }

  const receipts: RoomEventReceipts[] = Object.keys(receiptEvent.content).map(
    (eventId) => {
      const receipts = receiptEvent.content[eventId];
      return { roomId, eventId, receipts };
    },
  );

  return receipts;
};
