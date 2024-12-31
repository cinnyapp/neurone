import { putRedact } from "./redact";

test("put redact message with reason request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";
  const txnId = "txn";

  const body = {
    reason: "xyz",
  };

  expect(putRedact({ pathParams: { roomId, eventId, txnId }, body })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/redact/${encodeURIComponent(eventId)}/${encodeURIComponent(txnId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("put redact message without reason body request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "evt_type";
  const txnId = "txn";

  expect(putRedact({ pathParams: { roomId, eventId, txnId } })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/redact/${encodeURIComponent(eventId)}/${encodeURIComponent(txnId)}`,
    requireAuthentication: true,
  });
});
