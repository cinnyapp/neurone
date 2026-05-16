import { getContext } from "./context";

test("event context request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";

  expect(
    getContext({
      pathParams: {
        roomId,
        eventId,
      },
      searchParams: {
        limit: 1,
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/context/${encodeURIComponent(eventId)}?limit=1`,
    requireAuthentication: true,
  });
});
