import { turnServer } from "./turnServer";

test("get turn server request", () => {
  expect(turnServer()).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/voip/turnServer",
    rateLimited: true,
    requireAuthentication: true,
  });
});
