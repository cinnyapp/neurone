import { joinedRooms } from "./joinedRooms";

test("get joined rooms request", () => {
  expect(joinedRooms()).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/joined_rooms",
    requireAuthentication: true,
  });
});
