import { getVersions } from "./versions";

test("get server supported spec versions request", () => {
  expect(getVersions({})).toEqual({
    method: "GET",
    path: "/_matrix/client/versions",
  });
});
