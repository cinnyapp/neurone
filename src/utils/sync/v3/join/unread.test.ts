import { JoinRoom } from "../../../../api/matrix/client/v3/sync";
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

  const joinRoom: JoinRoom = {
    unread_notifications: unreadCount,
  };

  expect(roomUnreadNotifications(joinRoom)).toEqual(unreadCount);

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

  const joinRoom: JoinRoom = {
    unread_thread_notifications: roomToUnread,
  };

  expect(roomUnreadThreadNotifications(joinRoom)).toEqual(roomToUnread);

  expect(roomUnreadThreadNotifications({})).toBe(undefined);
});
