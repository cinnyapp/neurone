import { postSearch } from "./search";

test("post search room events request", () => {
  const body = {
    search_categories: {
      room_events: {
        search_term: "some string",
      },
    },
  };

  expect(postSearch(body)).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/search`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
