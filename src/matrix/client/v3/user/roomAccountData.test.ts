import { roomAccountData, putRoomAccountData } from "./roomAccountData";

test("get room account data request", () => {
  const userId = "@test:server.name";
  const roomId = "!roomId:server.name";
  const type = "x.test.data";

  expect(
    roomAccountData({
      userId,
      roomId,
      type,
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
  const data = {
    xyz: false,
  };

  expect(
    putRoomAccountData(
      {
        userId,
        roomId,
        type,
      },
      data,
    ),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/rooms/${encodeURIComponent(roomId)}/account_data/${encodeURIComponent(type)}`,
    requireAuthentication: true,
    body: JSON.stringify(data),
  });
});
