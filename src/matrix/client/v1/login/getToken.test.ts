import { postGetToken } from "./getToken";

test("post get_token request", () => {
  const body = {
    auth: {
      type: "some",
      session: "some",
    },
  };

  expect(postGetToken(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v1/login/get_token",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
