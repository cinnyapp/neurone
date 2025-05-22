import { JoinRoom } from "../../../../api/matrix/client/v3/sync";
import { UnreadNotificationCounts } from "../../../../api/types";

export const roomUnreadNotifications = (
  joinRoom: JoinRoom,
): UnreadNotificationCounts | undefined => joinRoom.unread_notifications;

export const roomUnreadThreadNotifications = (
  joinRoom: JoinRoom,
): Record<string, UnreadNotificationCounts> | undefined =>
  joinRoom.unread_thread_notifications;
