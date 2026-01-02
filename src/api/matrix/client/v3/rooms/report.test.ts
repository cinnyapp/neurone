import { postReportEventId } from "./report";

test("post event report request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";

  const body = {
    reason: "xyz",
  };

  expect(postReportEventId({ pathParams: { roomId, eventId }, body })).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/report/${encodeURIComponent(eventId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
