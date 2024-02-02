import { roomTags, putRoomTag, deleteRoomTag } from "./roomTags";
import { RoomTagContent } from "./roomTags.type";

test("get room tags request", () => {
  const userId = "@test:server.name";
  const roomId = "!test:server.name";

  expect(
    roomTags({
      userId,
      roomId,
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
  const tagContent: RoomTagContent = {
    order: 0.5,
  };

  expect(
    putRoomTag(
      {
        userId,
        roomId,
        tag,
      },
      tagContent,
    ),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/rooms/${encodeURIComponent(roomId)}/tags/${encodeURIComponent(tag)}`,
    requireAuthentication: true,
    body: JSON.stringify(tagContent),
  });
});

test("delete room tag request", () => {
  const userId = "@test:server.name";
  const roomId = "!test:server.name";
  const tag = "xyz.tag";

  expect(
    deleteRoomTag({
      userId,
      roomId,
      tag,
    }),
  ).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/rooms/${encodeURIComponent(roomId)}/tags/${encodeURIComponent(tag)}`,
    requireAuthentication: true,
  });
});
