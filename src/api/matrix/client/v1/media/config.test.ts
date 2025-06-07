import { getConfig } from "./config";

test("get media config request", () => {
  expect(getConfig({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v1/media/config",
    rateLimited: true,
    requireAuthentication: true,
  });
});
