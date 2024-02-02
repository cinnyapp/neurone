/**
 * putRedact types
 */
export type PutRedactPathParams = {
  roomId: string;
  eventId: string;
  txnId: string;
};
export type PutRedactBody = {
  reason?: string;
};
export type PutRedactOK = {
  event_id?: string;
};
