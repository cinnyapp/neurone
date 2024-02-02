import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  DeleteRoomTagPathParams,
  PutRoomTagBody,
  PutRoomTagPathParams,
  RoomTagsPathParams,
} from "./roomTags.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3useruseridroomsroomidtags
 */
export const roomTags = (
  pathParams: RoomTagsPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/rooms/${encodeURIComponent(pathParams.roomId)}/tags`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3useruseridroomsroomidtagstag
 */
export const putRoomTag = (
  pathParams: PutRoomTagPathParams,
  body: PutRoomTagBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/rooms/${encodeURIComponent(pathParams.roomId)}/tags/${encodeURIComponent(pathParams.tag)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3useruseridroomsroomidtagstag
 */
export const deleteRoomTag = (
  pathParams: DeleteRoomTagPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/rooms/${encodeURIComponent(pathParams.roomId)}/tags/${encodeURIComponent(pathParams.tag)}`;

  return {
    method: "DELETE",
    path,
    requireAuthentication: true,
  };
};
