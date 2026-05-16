import { getDownload, getDownloadFile } from "./download";

test("get media download request", () => {
  const serverName = "server.name";
  const mediaId = "some";

  expect(
    getDownload({
      pathParams: { serverName, mediaId },
      searchParams: { allow_redirect: true },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/media/v3/download/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}?allow_redirect=true`,
    rateLimited: true,
  });
});

test("get media download file request", () => {
  const serverName = "server.name";
  const mediaId = "some";
  const fileName = "name.filetype";

  expect(
    getDownloadFile({
      pathParams: { serverName, mediaId, fileName },
      searchParams: { allow_redirect: true },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/media/v3/download/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}/${encodeURIComponent(fileName)}?allow_redirect=true`,
    rateLimited: true,
  });
});
