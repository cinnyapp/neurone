import {
  DeleteRoomTagEndpoint,
  GetRoomTagsEndpoint,
  PutRoomTagEndpoint,
} from "./roomTags.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3useruseridroomsroomidtags
 */
export const getRoomTags: GetRoomTagsEndpoint = ({ pathParams }) => {
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
export const putRoomTag: PutRoomTagEndpoint = ({ pathParams, body }) => {
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
export const deleteRoomTag: DeleteRoomTagEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/rooms/${encodeURIComponent(pathParams.roomId)}/tags/${encodeURIComponent(pathParams.tag)}`;

  return {
    method: "DELETE",
    path,
    requireAuthentication: true,
  };
};
