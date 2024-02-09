import { versions } from "./versions";

test("get server supported spec versions request", () => {
  expect(versions()).toEqual({
    method: "GET",
    path: "/_matrix/client/versions",
  });
});
