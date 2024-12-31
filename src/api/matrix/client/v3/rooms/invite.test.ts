import { postInvite } from "./invite";

test("post invite with user id to room request", () => {
  const roomId = "!roomId:server.name";
  const body = {
    user_id: "@xyz:server.name",
    reason: "some reason",
  };

  expect(
    postInvite({
      pathParams: {
        roomId,
      },
      body,
    }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/invite`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("post invite using third-party identifier room request", () => {
  const roomId = "!roomId:server.name";
  const body = {
    address: "xyz@server.name",
    id_access_token: "some",
    id_server: "xyz",
    medium: "email",
  };

  expect(
    postInvite({
      pathParams: {
        roomId,
      },
      body,
    }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/invite`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
