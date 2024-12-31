import { getEvent } from "./event";

test("get event request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";

  expect(
    getEvent({
      pathParams: {
        roomId,
        eventId,
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/event/${encodeURIComponent(eventId)}`,
    requireAuthentication: true,
  });
});
