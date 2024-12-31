import { postJoin } from "./join";

test("post join with reason to room request", () => {
  const roomId = "!roomId:server.name";
  const body = {
    reason: "some reason",
  };

  expect(
    postJoin({
      pathParams: {
        roomId,
      },
      body,
    }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/join`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
