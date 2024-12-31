import { postRefresh } from "./refresh";

test("post refresh login token request", () => {
  const body = {
    refresh_token: "XYZ",
  };

  expect(postRefresh({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/login/refresh",
    rateLimited: true,
    body: JSON.stringify(body),
  });
});
