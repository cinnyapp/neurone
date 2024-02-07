import { postUpload } from "./upload";

test("post device keys upload request", () => {
  const body = {
    device_keys: {
      algorithms: ["al1", "al2"],
      device_id: "one",
      keys: {
        "algo:device": "key",
      },
      signatures: {},
      user_id: "@user:server.name",
    },
  };
  expect(postUpload(body)).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/keys/upload`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
