import { messages } from "./messages";

test("get room messages request", () => {
  const roomId = "!roomId:server.name";

  expect(
    messages(
      { roomId },
      {
        dir: "b",
      },
    ),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/messages?dir=b`,
    requireAuthentication: true,
  });
});
