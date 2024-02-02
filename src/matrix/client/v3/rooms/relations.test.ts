import {
  relations,
  relationsRelType,
  relationsRelTypeEventType,
} from "./relations";

test("get relations message request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";

  expect(
    relations(
      { roomId, eventId },
      {
        dir: "b",
      },
    ),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}?dir=b`,
    requireAuthentication: true,
  });
});

test("get relations message request without search params", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";

  expect(relations({ roomId, eventId })).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}`,
    requireAuthentication: true,
  });
});

test("get relations with rel type message request without search params", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";
  const relType = "m.thread";

  expect(relationsRelType({ roomId, eventId, relType })).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}/${encodeURIComponent(relType)}`,
    requireAuthentication: true,
  });
});

test("get relations with rel type and event type message request without search params", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";
  const relType = "some.relation";
  const eventType = "some.event_type";

  expect(
    relationsRelTypeEventType({ roomId, eventId, relType, eventType }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}/${encodeURIComponent(relType)}/${eventType}`,
    requireAuthentication: true,
  });
});
