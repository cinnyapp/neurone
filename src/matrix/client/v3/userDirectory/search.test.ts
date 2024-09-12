import { postSearch } from "./search";

test("post user serach request", () => {
  const body = {
    search_term: "sometext",
  };

  expect(postSearch(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/user_directory/search",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
