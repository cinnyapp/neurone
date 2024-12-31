import { getHierarchy } from "./hierarchy";

test("get room hierarchy request", () => {
  const roomId = "!roomId:server.name";

  expect(
    getHierarchy({
      pathParams: { roomId },
      searchParams: {
        from: "xyz",
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/hierarchy?from=xyz`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
