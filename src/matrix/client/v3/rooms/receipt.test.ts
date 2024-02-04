import { postReceiptEventId } from "./receipt";
import { ReceiptType } from "./receipt.type";

test("post receipt for event id request", () => {
  const roomId = "!roomId:server.name";
  const receiptType: ReceiptType = "m.read";
  const eventId = "$evt:server.name";

  const body = {
    thread_id: "main",
  };

  expect(postReceiptEventId({ roomId, receiptType, eventId }, body)).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/receipt/${encodeURIComponent(receiptType)}/${encodeURIComponent(eventId)}`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
