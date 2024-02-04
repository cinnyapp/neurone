export type ReceiptType = "m.read" | "m.read.private" | "m.fully_read";

/**
 * postReceiptEventId type
 */
export type PostReceiptEventIdPathParams = {
  roomId: string;
  receiptType: ReceiptType;
  eventId: string;
};
export type PostReceiptEventIdBody = {
  thread_id?: string;
};
export type PostReceiptEventIdOK = Record<string, never>;
