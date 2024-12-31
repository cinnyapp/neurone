import { getAvatarUrl, putAvatarUrl } from "./avatarUrl";

test("get user avatar url request", () => {
  const userId = "@user:server.name";

  expect(getAvatarUrl({ pathParams: { userId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/profile/${encodeURIComponent(userId)}/avatar_url`,
  });
});

test("put user avatar url request", () => {
  const userId = "@user:server.name";
  const body = {
    avatar_url: "mxc://some",
  };

  expect(putAvatarUrl({ pathParams: { userId }, body })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/profile/${encodeURIComponent(userId)}/avatar_url`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
