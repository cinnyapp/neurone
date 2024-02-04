import { room, putRoom, deleteRoom } from "./room";

test("get room alias request", () => {
  const roomAlias = "#room:server.name";

  expect(room({ roomAlias })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/directory/room/${encodeURIComponent(roomAlias)}`,
  });
});

test("put room alias request", () => {
  const roomAlias = "#room:server.name";
  const body = {
    room_id: "!roomId:server.name",
  };

  expect(putRoom({ roomAlias }, body)).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/directory/room/${encodeURIComponent(roomAlias)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete room alias request", () => {
  const roomAlias = "#room:server.name";

  expect(deleteRoom({ roomAlias })).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/directory/room/${encodeURIComponent(roomAlias)}`,
    requireAuthentication: true,
  });
});
