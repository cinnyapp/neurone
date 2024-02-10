import { available } from "./available";

test("get register username available request", () => {
  expect(available({ username: "user" })).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/register/available?username=user",
    rateLimited: true,
  });
});
