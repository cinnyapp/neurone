import { accountData, putAccountData } from "./accountData";

test("get account data request", () => {
  const userId = "@test:server.name";
  const type = "x.test.data";

  expect(
    accountData({
      userId,
      type,
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/account_data/${encodeURIComponent(type)}`,
    requireAuthentication: true,
  });
});

test("put account data request", () => {
  const userId = "@test:server.name";
  const type = "x.test.data";
  const data = {
    xyz: false,
  };

  expect(
    putAccountData(
      {
        userId,
        type,
      },
      data,
    ),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/account_data/${encodeURIComponent(type)}`,
    requireAuthentication: true,
    body: JSON.stringify(data),
  });
});
