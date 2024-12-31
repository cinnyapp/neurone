import { getMessages } from "./messages";

test("get room messages request", () => {
  const roomId = "!roomId:server.name";

  expect(
    getMessages({
      pathParams: { roomId },
      searchParams: {
        dir: "b",
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/messages?dir=b`,
    requireAuthentication: true,
  });
});
