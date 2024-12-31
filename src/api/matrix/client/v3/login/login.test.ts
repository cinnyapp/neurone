import { getLogin, postLogin } from "./login";
import { PostLoginBody } from "./login.type";

test("get login flow request", () => {
  expect(getLogin({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/login",
    rateLimited: true,
  });
});

test("post login request", () => {
  const body: PostLoginBody = {
    type: "m.login.password",
    password: "some",
    identifier: {
      type: "m.id.user",
      user: "some",
    },
  };

  expect(postLogin({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/login",
    rateLimited: true,
    body: JSON.stringify(body),
  });
});
