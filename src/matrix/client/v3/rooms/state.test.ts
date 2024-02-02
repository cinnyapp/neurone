import { state, stateEvent, putStateEvent } from "./state";

test("get room state request", () => {
  const roomId = "!roomId:server.name";

  expect(state({ roomId })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state`,
    requireAuthentication: true,
  });
});

test("get room state event request", () => {
  const roomId = "!roomId:server.name";
  const eventType = "my.evt.type";
  const stateKey = "my_key";

  expect(stateEvent({ roomId, eventType, stateKey })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/${encodeURIComponent(eventType)}/${encodeURIComponent(stateKey)}`,
    requireAuthentication: true,
  });
});

test("put room state event request", () => {
  const roomId = "!roomId:server.name";
  const eventType = "my.evt.type";
  const stateKey = "my_key";

  const body = { name: "xyz" };

  expect(putStateEvent({ roomId, eventType, stateKey }, body)).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/${encodeURIComponent(eventType)}/${encodeURIComponent(stateKey)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
