import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ReceiptType } from "../../../../types";

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
export type PostReceiptEventIdEndpoint = MatrixEndpoint<{
  pathParams: PostReceiptEventIdPathParams;
  body?: PostReceiptEventIdBody;
}>;
