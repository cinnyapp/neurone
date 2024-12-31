import { postLeave } from "./leave";

test("post leave room request", () => {
  const roomId = "!roomId:server.name";

  const body = {
    reason: "some reason",
  };

  expect(
    postLeave({
      pathParams: {
        roomId,
      },
      body,
    }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/leave`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
