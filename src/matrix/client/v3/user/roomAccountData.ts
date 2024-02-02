import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  RoomAccountDataPathParams,
  PutRoomAccountDataBody,
  PutRoomAccountDataPathParams,
} from "./roomAccountData.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3useruseridroomsroomidaccount_datatype
 */
export const roomAccountData = (
  pathParams: RoomAccountDataPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/rooms/${encodeURIComponent(pathParams.roomId)}/account_data/${encodeURIComponent(pathParams.type)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3useruseridroomsroomidaccount_datatype
 */
export const putRoomAccountData = <Content extends object>(
  pathParams: PutRoomAccountDataPathParams,
  body: PutRoomAccountDataBody<Content>,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/rooms/${encodeURIComponent(pathParams.roomId)}/account_data/${encodeURIComponent(pathParams.type)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
