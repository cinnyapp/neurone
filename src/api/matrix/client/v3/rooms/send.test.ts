import { putSend } from "./send";

test("put send message request", () => {
  const roomId = "!roomId:server.name";
  const eventType = "evt_type";
  const txnId = "txn";

  const body = {
    name: "xyz",
  };

  expect(putSend({ pathParams: { roomId, eventType, txnId }, body })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/send/${encodeURIComponent(eventType)}/${encodeURIComponent(txnId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
