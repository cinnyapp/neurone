import { postOpenidRequestToken } from "./openidRequestToken";

test("test post openid request token request", () => {
  const userId = "@userId:server.name";

  expect(postOpenidRequestToken({ userId })).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/openid/request_token`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
