/**
 * putSend types
 */
export type PutSendPathParams = {
  roomId: string;
  eventType: string;
  txnId: string;
};
export type PutSendBody = object;
export type PutSendOK = {
  event_id: string;
};
