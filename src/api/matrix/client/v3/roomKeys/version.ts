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

import {
  DeleteVersionVersionEndpoint,
  GetVersionEndpoint,
  GetVersionVersionEndpoint,
  PostVersionEndpoint,
  PutVersionVersionEndpoint,
} from "./version.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keysversion
 */
export const getVersion: GetVersionEndpoint = () => {
  const path = "/_matrix/client/v3/room_keys/version";

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3room_keysversion
 */
export const postVersion: PostVersionEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/room_keys/version";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keysversionversion
 */
export const getVersionVersion: GetVersionVersionEndpoint = ({
  pathParams,
}) => {
  const path = `/_matrix/client/v3/room_keys/version/${encodeURIComponent(pathParams.version)}`;

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3room_keysversionversion
 */
export const putVersionVersion: PutVersionVersionEndpoint = ({
  pathParams,
  body,
}) => {
  const path = `/_matrix/client/v3/room_keys/version/${encodeURIComponent(pathParams.version)}`;

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3room_keysversionversion
 */
export const deleteVersionVersion: DeleteVersionVersionEndpoint = ({
  pathParams,
}) => {
  const path = `/_matrix/client/v3/room_keys/version/${encodeURIComponent(pathParams.version)}`;

  return {
    method: "DELETE",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
