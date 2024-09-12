import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  DeleteKeysRoomIdPathParams,
  DeleteKeysRoomIdSearchParams,
  DeleteKeysRoomIdSessionIdPathParams,
  DeleteKeysRoomIdSessionIdSearchParams,
  DeleteKeysSearchParams,
  KeysRoomIdPathParams,
  KeysRoomIdSearchParams,
  KeysRoomIdSessionIdPathParams,
  KeysRoomIdSessionIdSearchParams,
  KeysSearchParams,
  PutKeysBody,
  PutKeysRoomIdBody,
  PutKeysRoomIdPathParams,
  PutKeysRoomIdSearchParams,
  PutKeysRoomIdSessionIdBody,
  PutKeysRoomIdSessionIdPathParams,
  PutKeysRoomIdSessionIdSearchParams,
  PutKeysSearchParams,
} from "./keys.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keyskeys
 */
export const keys = (searchParams: KeysSearchParams): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    "/_matrix/client/v3/room_keys/keys",
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3room_keyskeys
 */
export const putKeys = (
  searchParams: PutKeysSearchParams,
  body: PutKeysBody,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    "/_matrix/client/v3/room_keys/keys",
    sParams.toString(),
  );

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3room_keyskeys
 */
export const deleteKeys = (
  searchParams: DeleteKeysSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    "/_matrix/client/v3/room_keys/keys",
    sParams.toString(),
  );

  return {
    method: "DELETE",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keyskeysroomid
 */
export const keysRoomId = (
  pathParams: KeysRoomIdPathParams,
  searchParams: KeysRoomIdSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3room_keyskeysroomid
 */
export const putKeysRoomId = (
  pathParams: PutKeysRoomIdPathParams,
  searchParams: PutKeysRoomIdSearchParams,
  body: PutKeysRoomIdBody,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}`,
    sParams.toString(),
  );

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3room_keyskeysroomid
 */
export const deleteKeysRoomId = (
  pathParams: DeleteKeysRoomIdPathParams,
  searchParams: DeleteKeysRoomIdSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}`,
    sParams.toString(),
  );

  return {
    method: "DELETE",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keyskeysroomidsessionid
 */
export const keysRoomIdSessionId = (
  pathParams: KeysRoomIdSessionIdPathParams,
  searchParams: KeysRoomIdSessionIdSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}/${encodeURIComponent(pathParams.sessionId)}`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3room_keyskeysroomidsessionid
 */
export const putKeysRoomIdSessionId = (
  pathParams: PutKeysRoomIdSessionIdPathParams,
  searchParams: PutKeysRoomIdSessionIdSearchParams,
  body: PutKeysRoomIdSessionIdBody,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}/${encodeURIComponent(pathParams.sessionId)}`,
    sParams.toString(),
  );

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3room_keyskeysroomidsessionid
 */
export const deleteKeysRoomIdSessionId = (
  pathParams: DeleteKeysRoomIdSessionIdPathParams,
  searchParams: DeleteKeysRoomIdSessionIdSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}/${encodeURIComponent(pathParams.sessionId)}`,
    sParams.toString(),
  );

  return {
    method: "DELETE",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
