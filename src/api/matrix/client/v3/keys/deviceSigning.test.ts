import { postDeviceSigningUpload } from "./deviceSigning";

test("post device signing upload request", () => {
  const body = {
    master_key: {
      keys: {
        "algo:key": "base64",
      },
      usage: ["master"],
      user_id: "@some:server.name",
    },
  };

  expect(postDeviceSigningUpload({ body })).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/keys/device_signing/upload`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
