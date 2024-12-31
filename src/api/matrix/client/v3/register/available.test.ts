import { getAvailable } from "./available";

test("get register username available request", () => {
  expect(getAvailable({ searchParams: { username: "user" } })).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/register/available?username=user",
    rateLimited: true,
  });
});
