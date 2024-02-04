import { postCreateRoom } from "./createRoom";
import { PostCreateRoomBody } from "./createRoom.type";

test("create room request", () => {
  const body: PostCreateRoomBody = {
    name: "testRoom",
    topic: "testing",
    visibility: "private",
    preset: "private_chat",
    invite: ["@useriD:server.name"],
  };

  expect(postCreateRoom(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/createRoom",
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
