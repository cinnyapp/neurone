import { getAuthMetadata } from "./authMetadata";

test("get auth metadata request", () => {
  expect(getAuthMetadata({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v1/auth_metadata",
  });
});
