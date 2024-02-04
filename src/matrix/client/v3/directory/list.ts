import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  ListRoomPathParams,
  PutListRoomBody,
  PutListRoomPathParams,
} from "./list.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3directorylistroomroomid
 */
export const listRoom = (
  pathParams: ListRoomPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/directory/list/room/${encodeURIComponent(pathParams.roomId)}`;

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3directorylistroomroomid
 */
export const putListRoom = (
  pathParams: PutListRoomPathParams,
  body: PutListRoomBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/directory/list/room/${encodeURIComponent(pathParams.roomId)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
