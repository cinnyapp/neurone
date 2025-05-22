import { JoinedRoom } from "../../../../api/matrix/client/v3/sync";
import { UnreadNotificationCounts } from "../../../../api/types";

export const roomUnreadNotifications = (
  joinedRoom: JoinedRoom,
): UnreadNotificationCounts | undefined => joinedRoom.unread_notifications;

export const roomUnreadThreadNotifications = (
  joinedRoom: JoinedRoom,
): Record<string, UnreadNotificationCounts> | undefined =>
  joinedRoom.unread_thread_notifications;
