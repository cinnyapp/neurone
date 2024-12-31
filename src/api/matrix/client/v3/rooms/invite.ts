import { PostInviteEndpoint } from "./invite.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidinvite
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidinvite-1
 */
export const postInvite: PostInviteEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/invite`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
