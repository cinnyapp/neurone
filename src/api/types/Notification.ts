import { ClientEventWithoutRoomId } from "./ClientEvent";

export type NotificationChunk = {
  actions: object | string;
  event: ClientEventWithoutRoomId;
  profile_tag?: string;
  read: boolean;
  room_id: string;
  ts: number;
};
