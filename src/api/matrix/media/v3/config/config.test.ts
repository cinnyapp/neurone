import { getConfig } from "./config";

test("get media config request", () => {
  expect(getConfig({})).toEqual({
    method: "GET",
    path: "/_matrix/media/v3/config",
    rateLimited: true,
    requireAuthentication: true,
  });
});
