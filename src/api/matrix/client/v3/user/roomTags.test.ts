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
