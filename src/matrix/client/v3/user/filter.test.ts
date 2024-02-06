import { postFilter, filter } from "./filter";
import { Filter } from "./filter.type";

test("post user filter request", () => {
  const filter: Filter = {
    room: {
      state: {
        lazy_load_members: true,
      },
    },
  };

  const userId = "@test:server.name";

  expect(postFilter({ userId }, filter)).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/filter`,
    requireAuthentication: true,
    body: JSON.stringify(filter),
  });
});

test("get user filter request", () => {
  const userId = "@test:server.name";

  expect(filter({ userId, filterId: "11" })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/user/${encodeURIComponent(userId)}/filter/11`,
    requireAuthentication: true,
  });
});
