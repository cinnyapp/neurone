import { postLogout, postLogoutAll } from "./logout";

test("post logout request", () => {
  expect(postLogout()).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/logout",
    requireAuthentication: true,
  });
});

test("post logout request", () => {
  expect(postLogoutAll()).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/logout/all",
    requireAuthentication: true,
  });
});
