import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PutSendBody, PutSendPathParams } from "./send.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3roomsroomidsendeventtypetxnid
 */
export const putSend = (
  pathParam: PutSendPathParams,
  body: PutSendBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParam.roomId)}/send/${encodeURIComponent(pathParam.eventType)}/${encodeURIComponent(pathParam.txnId)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
