import {
  DeleteRoomEndpoint,
  GetRoomEndpoint,
  PutRoomEndpoint,
} from "./room.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3directoryroomroomalias
 */
export const getRoom: GetRoomEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/directory/room/${encodeURIComponent(pathParams.roomAlias)}`;

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3directoryroomroomalias
 */
export const putRoom: PutRoomEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/directory/room/${encodeURIComponent(pathParams.roomAlias)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3directoryroomroomalias
 */
export const deleteRoom: DeleteRoomEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/directory/room/${encodeURIComponent(pathParams.roomAlias)}`;

  return {
    method: "DELETE",
    path,
    requireAuthentication: true,
  };
};
