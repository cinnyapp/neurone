import { postInvite } from "./invite";

test("post invite user to room request", () => {
  const roomId = "!roomId:server.name";
  const body = {
    user_id: "@xyz:server.name",
    reason: "some reason",
  };

  expect(
    postInvite(
      {
        roomId,
      },
      body,
    ),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/invite`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
