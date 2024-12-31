import { getThreads } from "./threads";

test("get threads request", () => {
  const roomId = "!roomId:server.name";

  expect(
    getThreads({
      pathParams: { roomId },
      searchParams: {
        include: "participated",
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/threads?include=participated`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
