export type TypingContent = {
  user_ids: string[];
};
export type TypingEphemeralEvent = {
  content: TypingContent;
  type: "m.typing";
};

export type RoomTyping = {
  roomId: string;
  userIds: string[];
};

export type Receipt = {
  thread_id?: string;
  ts?: number;
};
export type UserIdToReceipt = Record<string, Receipt>;
export type EventReceipts = {
  "m.read"?: UserIdToReceipt;
  "m.read.private"?: UserIdToReceipt;
};
export type EventIdToReceipts = Record<string, EventReceipts>;
export type ReceiptEphemeralEvent = {
  content: EventIdToReceipts;
  type: "m.receipt";
};

export type RoomEventReceipts = {
  roomId: string;
  eventId: string;
  receipts: EventReceipts;
};
