import { config } from "./config";

test("get media config request", () => {
  expect(config()).toEqual({
    method: "GET",
    path: "/_matrix/media/v3/config",
    rateLimited: true,
    requireAuthentication: true,
  });
});
