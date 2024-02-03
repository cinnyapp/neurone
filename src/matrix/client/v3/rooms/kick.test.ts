import { postKick } from "./kick";

test("post kick room request", () => {
  const roomId = "!roomId:server.name";

  const body = {
    reason: "some reason",
    user_id: "@userId:server.name",
  };

  expect(
    postKick(
      {
        roomId,
      },
      body,
    ),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/kick`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
