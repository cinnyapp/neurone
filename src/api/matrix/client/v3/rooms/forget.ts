import { PostForgetEndpoint } from "./forget.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidforget
 */
export const postForget: PostForgetEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/forget`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
