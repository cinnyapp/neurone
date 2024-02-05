import { displayname, putDisplayname } from "./displayname";

test("get user avatar url request", () => {
  const userId = "@user:server.name";

  expect(displayname({ userId })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/profile/${encodeURIComponent(userId)}/displayname`,
  });
});

test("put user avatar url request", () => {
  const userId = "@user:server.name";
  const body = {
    displayname: "name",
  };

  expect(putDisplayname({ userId }, body)).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/profile/${encodeURIComponent(userId)}/displayname`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
