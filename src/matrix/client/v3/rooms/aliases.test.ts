import { aliases } from "./aliases";

test("get room aliases request", () => {
  const roomId = "!roomId:server.name";

  expect(
    aliases({
      roomId,
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/aliases`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
