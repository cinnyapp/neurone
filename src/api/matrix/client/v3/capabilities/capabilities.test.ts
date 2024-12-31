import { getCapabilities } from "./capabilities";

test("get server capabilities request", () => {
  expect(getCapabilities({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/capabilities",
    rateLimited: true,
    requireAuthentication: true,
  });
});
