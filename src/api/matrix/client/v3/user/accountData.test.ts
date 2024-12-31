import { getAccountData, putAccountData } from "./accountData";

test("get account data request", () => {
  const userId = "@test:server.name";
  const type = "x.test.data";

  expect(
    getAccountData({
      pathParams: {
        userId,
        type,
      },
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
  const body = {
    xyz: false,
  };

  expect(
    putAccountData({
      pathParams: {
        userId,
        type,
      },
      body,
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/account_data/${encodeURIComponent(type)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
