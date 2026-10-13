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
  getKeys,
  putKeys,
  deleteKeys,
  getKeysRoomId,
  putKeysRoomId,
  deleteKeysRoomId,
  getKeysRoomIdSessionId,
  putKeysRoomIdSessionId,
  deleteKeysRoomIdSessionId,
} from "./keys";

test("get rooms keys request", () => {
  expect(
    getKeys({
      searchParams: {
        version: "22",
      },
    }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/room_keys/keys?version=22",
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("put rooms keys request", () => {
  const body = {
    rooms: {
      "!room:server.name": {
        sessions: {
          xyz_session: {
            first_message_index: 1,
            forwarded_count: 1,
            is_verified: true,
            session_data: {},
          },
        },
      },
    },
  };

  expect(
    putKeys({
      searchParams: {
        version: "22",
      },
      body,
    }),
  ).toEqual({
    method: "PUT",
    path: "/_matrix/client/v3/room_keys/keys?version=22",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete rooms keys request", () => {
  expect(
    deleteKeys({
      searchParams: {
        version: "22",
      },
    }),
  ).toEqual({
    method: "DELETE",
    path: "/_matrix/client/v3/room_keys/keys?version=22",
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("get room keys request", () => {
  const roomId = "!room:server.name";

  expect(
    getKeysRoomId({
      pathParams: { roomId },
      searchParams: {
        version: "22",
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(roomId)}?version=22`,
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("put room keys request", () => {
  const roomId = "!room:server.name";

  const body = {
    sessions: {
      xyz_session: {
        first_message_index: 1,
        forwarded_count: 1,
        is_verified: true,
        session_data: {},
      },
    },
  };

  expect(
    putKeysRoomId({
      pathParams: { roomId },
      searchParams: {
        version: "22",
      },
      body,
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(roomId)}?version=22`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete room keys request", () => {
  const roomId = "!room:server.name";

  expect(
    deleteKeysRoomId({
      pathParams: { roomId },
      searchParams: {
        version: "22",
      },
    }),
  ).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(roomId)}?version=22`,
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("get room session keys request", () => {
  const roomId = "!room:server.name";
  const sessionId = "session1";

  expect(
    getKeysRoomIdSessionId({
      pathParams: { roomId, sessionId },
      searchParams: {
        version: "22",
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(roomId)}/${encodeURIComponent(sessionId)}?version=22`,
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("put room session keys request", () => {
  const roomId = "!room:server.name";
  const sessionId = "session1";

  const body = {
    first_message_index: 1,
    forwarded_count: 1,
    is_verified: true,
    session_data: {},
  };

  expect(
    putKeysRoomIdSessionId({
      pathParams: { roomId, sessionId },
      searchParams: {
        version: "22",
      },
      body,
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(roomId)}/${encodeURIComponent(sessionId)}?version=22`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete room session keys request", () => {
  const roomId = "!room:server.name";
  const sessionId = "session1";

  expect(
    deleteKeysRoomIdSessionId({
      pathParams: { roomId, sessionId },
      searchParams: {
        version: "22",
      },
    }),
  ).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(roomId)}/${encodeURIComponent(sessionId)}?version=22`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
