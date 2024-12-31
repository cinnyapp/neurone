import { postCreate } from "./create";

test("post create matrix content uri request", () => {
  expect(postCreate({})).toEqual({
    method: "POST",
    path: "/_matrix/media/v1/create",
    rateLimited: true,
    requireAuthentication: true,
  });
});
