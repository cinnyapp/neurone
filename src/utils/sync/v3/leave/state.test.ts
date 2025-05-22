import { LeaveRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import { roomState } from "./state";

test("get leave room state events from joined room sync response", () => {
  const stateEventsWithoutRoomId = [
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
  const leaveRoom: LeaveRoom = {
    state: {
      events: stateEventsWithoutRoomId,
    },
    timeline: {
      events: timelineEventsWithoutRoomId,
    },
  };

  expect(roomState(leaveRoom)).toEqual([
    ...stateEventsWithoutRoomId,
    timelineEventsWithoutRoomId[0],
  ]);

  expect(roomState(leaveRoom)).not.toEqual([
    ...stateEventsWithoutRoomId,
    timelineEventsWithoutRoomId[1],
  ]);
});
