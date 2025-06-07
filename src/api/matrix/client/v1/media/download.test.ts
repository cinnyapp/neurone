import { getDownload, getDownloadFile } from "./download";

test("get media download request", () => {
  const serverName = "server.name";
  const mediaId = "some";

  expect(
    getDownload({
      pathParams: { serverName, mediaId },
      searchParams: {},
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/media/download/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}`,
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("get media download file request", () => {
  const serverName = "server.name";
  const mediaId = "some";
  const fileName = "name.filetype";

  expect(
    getDownloadFile({
      pathParams: { serverName, mediaId, fileName },
      searchParams: {},
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/media/download/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}/${encodeURIComponent(fileName)}`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
