import { getAliases } from "./aliases";

test("get room aliases request", () => {
  const roomId = "!roomId:server.name";

  expect(
    getAliases({
      pathParams: { roomId },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/aliases`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
