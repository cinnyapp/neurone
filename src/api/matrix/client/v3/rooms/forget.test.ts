import { postForget } from "./forget";

test("post forget room request", () => {
  const roomId = "!roomId:server.name";

  expect(
    postForget({
      pathParams: { roomId },
    }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/forget`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
