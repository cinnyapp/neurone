import { postLogout } from "./logout";

test("post logout request", () => {
  expect(postLogout()).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/logout",
    requireAuthentication: true,
  });
});
