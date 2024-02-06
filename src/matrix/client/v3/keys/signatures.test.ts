import { postSignaturesUpload } from "./signatures";

test("post signatures upload request", () => {
  const body = {
    "@some:server.name": {
      Device: {
        user_id: "@some:server.name",
      },
    },
  };

  expect(postSignaturesUpload(body)).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/keys/signatures/upload`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
