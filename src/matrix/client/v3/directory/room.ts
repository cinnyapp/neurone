import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  DeleteRoomPathParams,
  PutRoomBody,
  PutRoomPathParams,
  RoomPathParams,
} from "./room.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3directoryroomroomalias
 */
export const room = (pathParams: RoomPathParams): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/directory/room/${encodeURIComponent(pathParams.roomAlias)}`;

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3directoryroomroomalias
 */
export const putRoom = (
  pathParams: PutRoomPathParams,
  body: PutRoomBody,
): MatrixRequestStruct => {
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
export const deleteRoom = (
  pathParams: DeleteRoomPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/directory/room/${encodeURIComponent(pathParams.roomAlias)}`;

  return {
    method: "DELETE",
    path,
    requireAuthentication: true,
  };
};
