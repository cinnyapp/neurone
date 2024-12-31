import { PutSendEndpoint } from "./send.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3roomsroomidsendeventtypetxnid
 */
export const putSend: PutSendEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/send/${encodeURIComponent(pathParams.eventType)}/${encodeURIComponent(pathParams.txnId)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
