import { getRoomAccountData, putRoomAccountData } from "./roomAccountData";

test("get room account data request", () => {
  const userId = "@test:server.name";
  const roomId = "!roomId:server.name";
  const type = "x.test.data";

  expect(
    getRoomAccountData({
      pathParams: {
        userId,
        roomId,
        type,
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/rooms/${encodeURIComponent(roomId)}/account_data/${encodeURIComponent(type)}`,
    requireAuthentication: true,
  });
});

test("put room account data request", () => {
  const userId = "@test:server.name";
  const roomId = "!roomId:server.name";
  const type = "x.test.data";
  const body = {
    xyz: false,
  };

  expect(
    putRoomAccountData({
      pathParams: {
        userId,
        roomId,
        type,
      },
      body,
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/rooms/${encodeURIComponent(roomId)}/account_data/${encodeURIComponent(type)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
