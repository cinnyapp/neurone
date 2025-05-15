import { withSearchParams } from "../../../../utils";
import {
  DeleteKeysEndpoint,
  DeleteKeysRoomIdEndpoint,
  DeleteKeysRoomIdSessionIdEndopint,
  GetKeysEndpoint,
  GetKeysRoomIdEndpoint,
  GetKeysRoomIdSessionIdEndpoint,
  PutKeysEndpoint,
  PutKeysRoomIdEndpoint,
  PutKeysRoomIdSessionIdEndpont,
} from "./keys.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keyskeys
 */
export const getKeys: GetKeysEndpoint = ({ searchParams }) => {
  const path = withSearchParams(
    "/_matrix/client/v3/room_keys/keys",
    searchParams,
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
export const putKeys: PutKeysEndpoint = ({ searchParams, body }) => {
  const path = withSearchParams(
    "/_matrix/client/v3/room_keys/keys",
    searchParams,
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
export const deleteKeys: DeleteKeysEndpoint = ({ searchParams }) => {
  const path = withSearchParams(
    "/_matrix/client/v3/room_keys/keys",
    searchParams,
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
export const getKeysRoomId: GetKeysRoomIdEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}`,
    searchParams,
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
export const putKeysRoomId: PutKeysRoomIdEndpoint = ({
  pathParams,
  searchParams,
  body,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}`,
    searchParams,
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
export const deleteKeysRoomId: DeleteKeysRoomIdEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}`,
    searchParams,
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
export const getKeysRoomIdSessionId: GetKeysRoomIdSessionIdEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}/${encodeURIComponent(pathParams.sessionId)}`,
    searchParams,
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
export const putKeysRoomIdSessionId: PutKeysRoomIdSessionIdEndpont = ({
  pathParams,
  searchParams,
  body,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}/${encodeURIComponent(pathParams.sessionId)}`,
    searchParams,
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
export const deleteKeysRoomIdSessionId: DeleteKeysRoomIdSessionIdEndopint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(pathParams.roomId)}/${encodeURIComponent(pathParams.sessionId)}`,
    searchParams,
  );

  return {
    method: "DELETE",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
