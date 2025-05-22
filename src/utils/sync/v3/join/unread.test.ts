import { JoinedRoom } from "../../../../api/matrix/client/v3/sync";
import { UnreadNotificationCounts } from "../../../../api/types";
import {
  roomUnreadNotifications,
  roomUnreadThreadNotifications,
} from "./unread";

test("get room unread notifications from sync response", () => {
  const unreadCount: UnreadNotificationCounts = {
    highlight_count: 8,
    notification_count: 9,
  };

  const joinedRoom: JoinedRoom = {
    unread_notifications: unreadCount,
  };

  expect(roomUnreadNotifications(joinedRoom)).toEqual(unreadCount);

  expect(roomUnreadNotifications({})).toBe(undefined);
});

test("get room unread thread notifications from sync response", () => {
  const unreadCount: UnreadNotificationCounts = {
    highlight_count: 8,
    notification_count: 9,
  };

  const roomToUnread = {
    "!abc:roomId": unreadCount,
  };

  const joinedRoom: JoinedRoom = {
    unread_thread_notifications: roomToUnread,
  };

  expect(roomUnreadThreadNotifications(joinedRoom)).toEqual(roomToUnread);

  expect(roomUnreadThreadNotifications({})).toBe(undefined);
});
