import { postUpload, putUpload } from "./upload";

test("post media upload request", () => {
  const blob = new Blob();

  expect(
    postUpload({
      searchParams: {
        filename: "myFile.ext",
      },
      body: blob,
    }),
  ).toEqual({
    method: "POST",
    path: "/_matrix/media/v3/upload?filename=myFile.ext",
    rateLimited: true,
    requireAuthentication: true,
    body: blob,
  });
});

test("put media upload request", () => {
  const serverName = "server.name";
  const mediaId = "some";
  const blob = new Blob();

  expect(
    putUpload({
      pathParams: { serverName, mediaId },
      body: blob,
      searchParams: {
        filename: "myFile.ext",
      },
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/media/v3/upload/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}?filename=myFile.ext`,
    rateLimited: true,
    requireAuthentication: true,
    body: blob,
  });
});
