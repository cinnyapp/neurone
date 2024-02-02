import { timestampToEvent } from "./timestampToEvent";

test("get timestamp to event request", () => {
  const roomId = "!roomId:server.name";

  expect(
    timestampToEvent(
      { roomId },
      {
        dir: "b",
        ts: "3234",
      },
    ),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/timestamp_to_event?dir=b&ts=3234`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
