import { listRoom, putListRoom } from "./list";
import { PutListRoomBody } from "./list.type";

test("get list room visibility request", () => {
  const roomId = "!roomId:server.name";

  expect(listRoom({ roomId })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/directory/list/room/${encodeURIComponent(roomId)}`,
  });
});

test("put list room visibility request", () => {
  const roomId = "!roomId:server.name";
  const body: PutListRoomBody = {
    visibility: "public",
  };

  expect(putListRoom({ roomId }, body)).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/directory/list/room/${encodeURIComponent(roomId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
