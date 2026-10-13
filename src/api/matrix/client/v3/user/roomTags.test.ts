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

import { getRoomTags, putRoomTag, deleteRoomTag } from "./roomTags";

test("get room tags request", () => {
  const userId = "@test:server.name";
  const roomId = "!test:server.name";

  expect(
    getRoomTags({
      pathParams: {
        userId,
        roomId,
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/rooms/${encodeURIComponent(roomId)}/tags`,
    requireAuthentication: true,
  });
});

test("put room tag request", () => {
  const userId = "@test:server.name";
  const roomId = "!test:server.name";
  const tag = "xyz.tag";
  const body = {
    order: 0.5,
  };

  expect(
    putRoomTag({
      pathParams: {
        userId,
        roomId,
        tag,
      },
      body,
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/rooms/${encodeURIComponent(roomId)}/tags/${encodeURIComponent(tag)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete room tag request", () => {
  const userId = "@test:server.name";
  const roomId = "!test:server.name";
  const tag = "xyz.tag";

  expect(
    deleteRoomTag({
      pathParams: {
        userId,
        roomId,
        tag,
      },
    }),
  ).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/rooms/${encodeURIComponent(roomId)}/tags/${encodeURIComponent(tag)}`,
    requireAuthentication: true,
  });
});
