import { getPreviewUrl } from "./previewUrl";

test("get preview url request", () => {
  expect(
    getPreviewUrl({ searchParams: { url: "http://server.name" } }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/media/v3/preview_url?url=http%3A%2F%2Fserver.name",
    rateLimited: true,
    requireAuthentication: true,
  });
});
