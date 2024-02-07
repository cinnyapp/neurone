import { postQuery } from "./query";

test("post keys query request", () => {
  const body = {
    device_keys: {
      "@user:server.name": ["DeviceId1", "DeviceId2"],
    },
  };
  expect(postQuery(body)).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/keys/query`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
