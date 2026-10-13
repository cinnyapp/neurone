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
  getVersion,
  postVersion,
  getVersionVersion,
  putVersionVersion,
  deleteVersionVersion,
} from "./version";

test("get rooms key version request", () => {
  expect(getVersion({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/room_keys/version",
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("post rooms key version request", () => {
  const body = {
    algorithm: "algo",
    auth_data: {},
  };

  expect(postVersion({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/room_keys/version",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("get rooms key version version request", () => {
  const version = "1";

  expect(
    getVersionVersion({
      pathParams: {
        version,
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/room_keys/version/${encodeURIComponent(version)}`,
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("put rooms key version version request", () => {
  const version = "1";
  const body = {
    algorithm: "algo",
    auth_data: {},
  };

  expect(
    putVersionVersion({
      pathParams: {
        version,
      },
      body,
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/room_keys/version/${encodeURIComponent(version)}`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete rooms key version version request", () => {
  const version = "1";

  expect(
    deleteVersionVersion({
      pathParams: {
        version,
      },
    }),
  ).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/room_keys/version/${encodeURIComponent(version)}`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
