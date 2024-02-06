import { notifications } from "./notifications";

test("get notifications request", () => {
  expect(
    notifications({
      limit: "30",
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/notifications?limit=30`,
    requireAuthentication: true,
  });
});
