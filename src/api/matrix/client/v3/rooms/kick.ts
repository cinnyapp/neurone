import { PostKickEndpoint } from "./kick.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidkick
 */
export const postKick: PostKickEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/kick`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
