import { postAll } from "./all";

test("post logout all request", () => {
  expect(postAll()).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/logout/all",
    requireAuthentication: true,
  });
});
