import { getThumbnail } from "./thumbnail";

test("get media thumbnail request", () => {
  const serverName = "server.name";
  const mediaId = "some";

  expect(
    getThumbnail({
      pathParams: { serverName, mediaId },
      searchParams: { width: "28", height: "28" },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/media/thumbnail/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}?width=28&height=28`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
