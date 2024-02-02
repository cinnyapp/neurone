import { members } from "./members";

test("get members for membership join request", () => {
  const roomId = "!roomId:server.name";

  expect(members({ roomId }, { membership: "join" })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/members?membership=join`,
    requireAuthentication: true,
  });
});
