import { putSendToDevice } from "./sendToDevice";

test("put send to device messages request", () => {
  const eventType = "some.type";
  const txnId = "someid";

  const body = {
    messages: {
      "!room:server.name": {
        DeviceId: {
          data: "some data",
        },
      },
    },
  };

  expect(putSendToDevice({ pathParams: { eventType, txnId }, body })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/sendToDevice/${encodeURIComponent(eventType)}/${encodeURIComponent(txnId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
