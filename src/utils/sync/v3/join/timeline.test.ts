import { JoinedRoom, Timeline } from "../../../../api/matrix/client/v3/sync";
import { ClientEventWithoutRoomId } from "../../../../api/types";
import { roomTimeline } from "./timeline";

test("get room timeline from sync response", () => {
  const timelineEventsWithoutRoomId: ClientEventWithoutRoomId[] = [
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

  const timeline: Timeline = {
    events: timelineEventsWithoutRoomId,
  };

  const joinedRoom: JoinedRoom = {
    timeline,
  };

  expect(roomTimeline(joinedRoom)).toEqual(timelineEventsWithoutRoomId);

  expect(roomTimeline({})).toEqual([]);
});
