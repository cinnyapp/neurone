/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
