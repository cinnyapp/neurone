import {
  keys,
  putKeys,
  deleteKeys,
  keysRoomId,
  putKeysRoomId,
  deleteKeysRoomId,
  keysRoomIdSessionId,
  putKeysRoomIdSessionId,
  deleteKeysRoomIdSessionId,
} from "./keys";

test("get rooms keys request", () => {
  expect(
    keys({
      version: "22",
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
    putKeys(
      {
        version: "22",
      },
      body,
    ),
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
      version: "22",
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
    keysRoomId(
      { roomId },
      {
        version: "22",
      },
    ),
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
    putKeysRoomId(
      { roomId },
      {
        version: "22",
      },
      body,
    ),
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
    deleteKeysRoomId(
      { roomId },
      {
        version: "22",
      },
    ),
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
    keysRoomIdSessionId(
      { roomId, sessionId },
      {
        version: "22",
      },
    ),
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
    putKeysRoomIdSessionId(
      { roomId, sessionId },
      {
        version: "22",
      },
      body,
    ),
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
    deleteKeysRoomIdSessionId(
      { roomId, sessionId },
      {
        version: "22",
      },
    ),
  ).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/room_keys/keys/${encodeURIComponent(roomId)}/${encodeURIComponent(sessionId)}?version=22`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
