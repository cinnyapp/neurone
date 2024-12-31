import { postFilter, getFilter } from "./filter";

test("post user filter request", () => {
  const body = {
    room: {
      state: {
        lazy_load_members: true,
      },
    },
  };

  const userId = "@test:server.name";

  expect(postFilter({ pathParams: { userId }, body })).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/filter`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("get user filter request", () => {
  const userId = "@test:server.name";

  expect(getFilter({ pathParams: { userId, filterId: "11" } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/filter/11`,
    requireAuthentication: true,
  });
});
