import { postUnban } from "./unban";

test("post unban room request", () => {
  const roomId = "!roomId:server.name";

  const body = {
    reason: "some reason",
    user_id: "@userId:server.name",
  };

  expect(
    postUnban(
      {
        roomId,
      },
      body,
    ),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/unban`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
