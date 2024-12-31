import { MatrixEndpoint } from "../../../../MatrixEndpoint";

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
export type PutRedactEndpoint = MatrixEndpoint<{
  pathParams: PutRedactPathParams;
  body?: PutRedactBody;
}>;
