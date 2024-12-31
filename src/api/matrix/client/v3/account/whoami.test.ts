import { getWhoami } from "./whoami";

test("get account who am i request", () => {
  expect(getWhoami({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/account/whoami",
    rateLimited: true,
    requireAuthentication: true,
  });
});
