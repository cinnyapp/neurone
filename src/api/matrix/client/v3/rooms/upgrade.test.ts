import { postUpgrade } from "./upgrade";

test("post upgrade room request", () => {
  const roomId = "!roomId:server.name";

  const body = {
    new_version: "10",
  };

  expect(
    postUpgrade({
      pathParams: { roomId },
      body,
    }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/upgrade`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
