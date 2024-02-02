import { joinedMembers } from "./joinedMembers";

test("get joined members request", () => {
  const roomId = "!roomId:server.name";

  expect(
    joinedMembers({
      roomId,
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/joined_members`,
    requireAuthentication: true,
  });
});
