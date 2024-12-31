import { PutTypingEndpoint } from "./typing.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3roomsroomidtypinguserid
 */
export const putTyping: PutTypingEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/typing/${encodeURIComponent(pathParams.userId)}`;

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
