import { JoinedRoom } from "../../../api/matrix/client/v3/sync/sync.type";
import { serializeRoomMeta } from "./roomMeta";
import { RoomMeta } from "./roomMeta.type";
import { serializeRoomState } from "./roomState";

test("serialize room meta from sync response (all fields)", () => {
  const roomId = "!jEsUZKDJdhlrceRyVU:example.org";
  const stateEventsWithoutRoomId = [
    {
      content: {},
      event_id: "$1:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "",
      type: "m.room.create",
    },
    {
      content: {
        name: "My Room",
      },
      event_id: "$2:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "",
      type: "m.room.name",
    },
    {
      content: {
        topic: "testing",
      },
      event_id: "$3:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "",
      type: "m.room.topic",
    },
    {
      content: {
        alias: "@myroom:example.org",
      },
      event_id: "$3:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "",
      type: "m.room.canonical_alias",
    },
    {
      content: {},
      event_id: "$4:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "",
      type: "m.room.encryption",
    },
    {
      content: {
        join_rule: "private",
      },
      event_id: "$6:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "",
      type: "m.room.join_rules",
    },
    {
      content: {
        history_visibility: "all",
      },
      event_id: "$7:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "",
      type: "m.room.history_visibility",
    },
    {
      content: {
        guest_access: "forbidden",
      },
      event_id: "$8:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "",
      type: "m.room.guest_access",
    },
  ];
  const timelineEventsWithoutRoomId = [
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
    summary: {
      "m.heroes": ["@alice:example.com", "@bob:example.com"],
      "m.invited_member_count": 0,
      "m.joined_member_count": 2,
    },
    state: {
      events: stateEventsWithoutRoomId,
    },
    timeline: {
      events: timelineEventsWithoutRoomId,
    },
  };

  const stateEvents = serializeRoomState(roomId, joinedRoom);

  const expectedRoomMeta: RoomMeta = {
    roomId,
    name: "My Room",
    topic: "testing",
    canonicalAlias: "@myroom:example.org",
    encryption: true,
    joinRule: "private",
    historyVisibility: "all",
    guestAccess: "forbidden",
    heros: ["@alice:example.com", "@bob:example.com"],
    memberCount: 2,
  };

  expect(serializeRoomMeta(roomId, stateEvents, joinedRoom.summary)).toEqual(
    expectedRoomMeta,
  );
});

test("serialize room meta from sync response (minimum fields)", () => {
  const roomId = "!jEsUZKDJdhlrceRyVU:example.org";
  const joinedRoom: JoinedRoom = {
    summary: {},
    state: {
      events: [],
    },
    timeline: {
      events: [],
    },
  };

  const stateEvents = serializeRoomState(roomId, joinedRoom);

  const expectedRoomMeta: RoomMeta = {
    roomId,
  };

  expect(serializeRoomMeta(roomId, stateEvents, joinedRoom.summary)).toEqual(
    expectedRoomMeta,
  );
});

test("serialize room meta from sync response (invalid room name type)", () => {
  const roomId = "!jEsUZKDJdhlrceRyVU:example.org";
  const joinedRoom: JoinedRoom = {
    summary: {},
    state: {
      events: [
        {
          content: {
            name: null,
          },
          event_id: "$2:example.org",
          origin_server_ts: 1432735824653,
          sender: "@example:example.org",
          state_key: "",
          type: "m.room.name",
        },
      ],
    },
    timeline: {
      events: [],
    },
  };

  const stateEvents = serializeRoomState(roomId, joinedRoom);

  const expectedRoomMeta: RoomMeta = {
    roomId,
  };

  expect(serializeRoomMeta(roomId, stateEvents, joinedRoom.summary)).toEqual(
    expectedRoomMeta,
  );
});
