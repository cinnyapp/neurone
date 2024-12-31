import { getState, getStateEvent, putStateEvent } from "./state";

test("get room state request", () => {
  const roomId = "!roomId:server.name";

  expect(getState({ pathParams: { roomId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state`,
    requireAuthentication: true,
  });
});

test("get room state event request", () => {
  const roomId = "!roomId:server.name";
  const eventType = "my.evt.type";
  const stateKey = "my_key";

  expect(
    getStateEvent({ pathParams: { roomId, eventType, stateKey } }),
  ).toEqual({
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

  expect(
    putStateEvent({ pathParams: { roomId, eventType, stateKey }, body }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/${encodeURIComponent(eventType)}/${encodeURIComponent(stateKey)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
