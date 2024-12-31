import { getProfile } from "./profile";

test("get user profile request", () => {
  const userId = "@user:server.name";

  expect(getProfile({ pathParams: { userId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/profile/${encodeURIComponent(userId)}`,
  });
});
