import { status, putStatus } from "./status";
import { PutStatusBody } from "./status.type";

test("status request", () => {
  const userId = "@userId:server.name";

  expect(status({ userId })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/presence/${encodeURIComponent(userId)}/status`,
    requireAuthentication: true,
  });
});

test("put status request", () => {
  const userId = "@userId:server.name";

  const body: PutStatusBody = {
    presence: "online",
    status: "Hello, World! I am online.",
  };

  expect(putStatus({ userId }, body)).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/presence/${encodeURIComponent(userId)}/status`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
