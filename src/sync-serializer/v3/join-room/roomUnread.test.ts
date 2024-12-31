import { JoinedRoom } from "../../../api/matrix/client/v3/sync/sync.type";
import { serializeRoomUnread, serializeRoomThreadsUnread } from "./roomUnread";

test("serialize room unread from sync data", () => {
  const roomId = "!some:server.name";

  const joinedRoom: JoinedRoom = {
    unread_notifications: {
      highlight_count: 8,
      notification_count: 12,
    },
  };

  expect(serializeRoomUnread(roomId, joinedRoom)).toEqual({
    roomId,
    unread: {
      highlight_count: 8,
      notification_count: 12,
    },
  });

  expect(serializeRoomUnread(roomId, {})).toBe(undefined);
});

test("serialize room threads unread from sync data", () => {
  const roomId = "!some:server.name";

  const joinedRoom: JoinedRoom = {
    unread_thread_notifications: {
      "$ev1:server.name": {
        highlight_count: 8,
        notification_count: 12,
      },
      "$ev3:server.name": {
        highlight_count: 0,
        notification_count: 4,
      },
    },
  };

  expect(serializeRoomThreadsUnread(roomId, joinedRoom)).toEqual([
    {
      roomId,
      eventId: "$ev1:server.name",
      unread: {
        highlight_count: 8,
        notification_count: 12,
      },
    },
    {
      roomId,
      eventId: "$ev3:server.name",
      unread: {
        highlight_count: 0,
        notification_count: 4,
      },
    },
  ]);

  expect(serializeRoomThreadsUnread(roomId, {})).toEqual([]);
});
