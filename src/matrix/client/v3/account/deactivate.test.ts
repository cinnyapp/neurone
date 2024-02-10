import { postDeactivate } from "./deactivate";

test("post account deactivate request", () => {
  expect(postDeactivate()).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/deactivate",
    rateLimited: true,
    requireAuthentication: true,
    body: undefined,
  });
});
