import {
  TimelineEventWithoutRoomId,
  StateEventWithoutRoomId,
  JoinedRoom,
} from "../../../matrix/client/v3/sync/sync.type";
import {
  serializeRoomState,
  serializeWithoutRoomIdStateEvent,
} from "./roomState";

test("serialize without roomId state event", () => {
  const roomId = "!jEsUZKDJdhlrceRyVU:example.org";
  const stateEventWithoutRoomId: StateEventWithoutRoomId = {
    content: {
      avatar_url: "mxc://example.org/SEsfnsuifSDFSSEF",
      displayname: "Alice Margatroid",
      membership: "join",
      reason: "Looking for support",
    },
    event_id: "$143273582443PhrSn:example.org",
    origin_server_ts: 1432735824653,
    sender: "@example:example.org",
    state_key: "@alice:example.org",
    type: "m.room.member",
    unsigned: {
      age: 1234,
    },
  };

  expect(
    serializeWithoutRoomIdStateEvent(roomId, stateEventWithoutRoomId),
  ).toEqual({
    room_id: roomId,
    ...stateEventWithoutRoomId,
  });
});

test("serialize state events from joined room sync response", () => {
  const roomId = "!jEsUZKDJdhlrceRyVU:example.org";
  const stateEventsWithoutRoomId: StateEventWithoutRoomId[] = [
    {
      content: {
        avatar_url: "mxc://example.org/SEsfnsuifSDFSSEF",
        displayname: "Alice Margatroid",
        membership: "join",
        reason: "Looking for support",
      },
      event_id: "$143273582443PhrSn:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "@alice:example.org",
      type: "m.room.member",
      unsigned: {
        age: 1234,
      },
    },
  ];
  const timelineEventsWithoutRoomId: TimelineEventWithoutRoomId[] = [
    {
      content: {
        avatar_url: "mxc://example.org/SEsfnsuifSDFSSEF",
        displayname: "Alice Margatroid",
        membership: "join",
        reason: "Looking for support",
      },
      event_id: "$143273582443PhrSn:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "@alice:example.org",
      type: "m.room.member",
      unsigned: {
        age: 1234,
      },
    },
    {
      content: {
        body: "This is an example text message",
        format: "org.matrix.custom.html",
        formatted_body: "<b>This is an example text message</b>",
        msgtype: "m.text",
      },
      event_id: "$143273582443PhrSn:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      type: "m.room.message",
      unsigned: {
        age: 1234,
      },
    },
  ];
  const joinedRoom: JoinedRoom = {
    state: {
      events: stateEventsWithoutRoomId,
    },
    timeline: {
      events: timelineEventsWithoutRoomId,
    },
  };

  expect(serializeRoomState(roomId, joinedRoom)).toEqual([
    ...stateEventsWithoutRoomId.map((evt) => ({
      room_id: roomId,
      ...evt,
    })),
    {
      room_id: roomId,
      ...timelineEventsWithoutRoomId[0],
    },
  ]);

  expect(serializeRoomState(roomId, joinedRoom)).not.toEqual([
    ...stateEventsWithoutRoomId.map((evt) => ({
      room_id: roomId,
      ...evt,
    })),
    {
      room_id: roomId,
      ...timelineEventsWithoutRoomId[1],
    },
  ]);
});
