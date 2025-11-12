import { PostCreateRoomEndpoint } from "./createRoom.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3createroom
 */
export const postCreateRoom: PostCreateRoomEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/createRoom";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body ?? {}),
  };
};
