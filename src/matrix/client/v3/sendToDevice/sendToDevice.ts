import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  PutSendToDeviceBody,
  PutSendToDevicePathParams,
} from "./sendToDevice.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3sendtodeviceeventtypetxnid
 */
export const putSendToDevice = (
  pathParams: PutSendToDevicePathParams,
  body: PutSendToDeviceBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/sendToDevice/${encodeURIComponent(pathParams.eventType)}/${pathParams.txnId}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
