import { postBan } from "./ban";

test("post ban room request", () => {
  const roomId = "!roomId:server.name";

  const body = {
    reason: "some reason",
    user_id: "@userId:server.name",
  };

  expect(
    postBan(
      {
        roomId,
      },
      body,
    ),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/ban`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
