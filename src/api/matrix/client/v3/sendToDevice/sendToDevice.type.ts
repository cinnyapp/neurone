import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * putSendToDevice
 */
export type PutSendToDevicePathParams = {
  eventType: string;
  txnId: string;
};
export type PutSendToDeviceBody = {
  messages: Record<string, Record<string, object>>;
};

export type PutSendToDeviceOK = Record<string, never>;
export type PutSendToDeviceEndpoint = MatrixEndpoint<{
  pathParams: PutSendToDevicePathParams;
  body: PutSendToDeviceBody;
}>;
