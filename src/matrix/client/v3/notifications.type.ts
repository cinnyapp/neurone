import { ClientEventWithoutRoomId } from "./sync/sync.type";

export type Notification = {
  actions: object | string;
  event: ClientEventWithoutRoomId;
  profile_tag?: string;
  read: boolean;
  room_id: string;
  ts: number;
};

/**
 * notifications types
 */
export type NotificationsSearchParams = {
  from?: string;
  limit?: string;
  only?: string;
};
export type NotificationsOK = {
  next_token?: string;
  notifications: Notification[];
};
