import { GetListRoomEndpoint, PutListRoomEndpoint } from "./list.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3directorylistroomroomid
 */
export const getListRoom: GetListRoomEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/directory/list/room/${encodeURIComponent(pathParams.roomId)}`;

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3directorylistroomroomid
 */
export const putListRoom: PutListRoomEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/directory/list/room/${encodeURIComponent(pathParams.roomId)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
