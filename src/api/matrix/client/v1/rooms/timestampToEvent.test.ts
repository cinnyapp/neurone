import { getTimestampToEvent } from "./timestampToEvent";

test("get timestamp to event request", () => {
  const roomId = "!roomId:server.name";

  expect(
    getTimestampToEvent({
      pathParams: { roomId },
      searchParams: {
        dir: "b",
        ts: 3234,
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/timestamp_to_event?dir=b&ts=3234`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
