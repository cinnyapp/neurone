import { postReceiptEventId } from "./receipt";

test("post receipt for event id request", () => {
  const roomId = "!roomId:server.name";
  const receiptType = "m.read";
  const eventId = "$evt:server.name";

  const body = {
    thread_id: "main",
  };

  expect(
    postReceiptEventId({ pathParams: { roomId, receiptType, eventId }, body }),
  ).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/receipt/${encodeURIComponent(receiptType)}/${encodeURIComponent(eventId)}`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
