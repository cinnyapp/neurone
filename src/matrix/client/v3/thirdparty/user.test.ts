import { user, userProtocol } from "./user";

test("get third party users", () => {
  expect(
    user({
      userid: "@some:server.name",
    }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/thirdparty/user?userid=%40some%3Aserver.name",
    requireAuthentication: true,
  });
});

test("get third party user protocol", () => {
  const protocol = "some";

  expect(
    userProtocol({
      protocol,
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/thirdparty/user/${encodeURIComponent(protocol)}`,
    requireAuthentication: true,
  });
});
