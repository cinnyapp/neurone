import { whois } from "./whois";

test("get whois request by admin", () => {
  const userId = "@user:server.name";

  expect(whois({ userId })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/admin/whois/${encodeURIComponent(userId)}`,
    requireAuthentication: true,
  });
});
