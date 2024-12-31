import { postClaim } from "./claim";

test("post keys claim request", () => {
  const body = {
    one_time_keys: {
      "@user:server.name": {
        DeviceId: "key",
      },
    },
  };
  expect(postClaim({ body })).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/keys/claim`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
