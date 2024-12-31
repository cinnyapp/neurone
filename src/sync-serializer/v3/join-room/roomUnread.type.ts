import { UnreadNotificationCounts } from "../../../api/types";

export type RoomUnread = {
  roomId: string;
  unread: UnreadNotificationCounts;
};

export type RoomThreadUnread = {
  roomId: string;
  eventId: string;
  unread: UnreadNotificationCounts;
};
