import { hierarchy } from "./hierarchy";

test("get room hierarchy request", () => {
  const roomId = "!roomId:server.name";

  expect(
    hierarchy(
      { roomId },
      {
        from: "xyz",
      },
    ),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/hierarchy?from=xyz`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
