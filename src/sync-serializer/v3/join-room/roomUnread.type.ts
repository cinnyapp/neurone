import { UnreadNotificationCounts } from "../../../matrix/client/v3/sync/sync.type";

export type RoomUnread = {
  roomId: string;
  unread: UnreadNotificationCounts;
};

export type RoomThreadUnread = {
  roomId: string;
  eventId: string;
  unread: UnreadNotificationCounts;
};
