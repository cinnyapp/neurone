import { postReport } from "./report";

test("post user report request", () => {
  const userId = "@username:server.name";

  const body = {
    reason: "xyz",
  };

  expect(postReport({ pathParams: { userId }, body })).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/users/${encodeURIComponent(userId)}/report`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
