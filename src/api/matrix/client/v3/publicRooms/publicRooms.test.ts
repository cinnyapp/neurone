import { getPublicRooms, postPublicRooms } from "./publicRooms";

test("get publicRooms request", () => {
  expect(
    getPublicRooms({
      searchParams: { limit: 32 },
    }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/publicRooms?limit=32",
  });
});

test("post publicRooms request", () => {
  const body = {
    filter: {
      room_types: ["m.space"],
    },
  };

  expect(
    postPublicRooms({
      searchParams: {
        server: "server.name",
      },
      body,
    }),
  ).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/publicRooms?server=server.name",
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
