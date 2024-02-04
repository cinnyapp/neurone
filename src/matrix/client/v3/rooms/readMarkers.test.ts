import { postReadMarkers } from "./readMarkers";

test("post full read markers for room request", () => {
  const roomId = "!roomId:server.name";

  const body = {
    "m.read": "$evtid:server.name",
  };

  expect(postReadMarkers({ roomId }, body)).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/read_markers`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
