import { putTyping } from "./typing";

test("put typing user request", () => {
  const roomId = "!roomId:server.name";
  const userId = "@user:server.name";

  const body = {
    typing: true,
  };

  expect(
    putTyping(
      {
        roomId,
        userId,
      },
      body,
    ),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/typing/${encodeURIComponent(userId)}`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
