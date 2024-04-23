import { Presence } from "../presence/status.type";
import { MessageEvent } from "../rooms/event.type";
import { StateEvent } from "../rooms/state.type";

export type AccountDataEvent<Content extends object = object> = {
  type: string;
  content: Content;
};

export type SyncAccountData = {
  events?: AccountDataEvent[];
};

export type SyncDeviceLists = {
  changed: string[];
  left: string[];
};

export type PresenceEvent<Content extends object = object> = {
  content: Content;
  sender: string;
  type: string;
};
export type SyncPresence = {
  events?: PresenceEvent[];
};

export type StrippedStateEvent = {
  content: object;
  sender: string;
  state_key: string;
  type: string;
};

export type InviteState = {
  events?: StrippedStateEvent[];
};

export type InvitedRoom = {
  invite_state?: InviteState;
};

export type EphemeralEvent<Content extends object = object> = {
  content: Content;
  type: string;
};
export type Ephemeral = {
  events?: EphemeralEvent[];
};

export type StateEventWithoutRoomId = Omit<StateEvent, "room_id">;
export type TimelineEventWithoutRoomId =
  | Omit<MessageEvent, "room_id">
  | Omit<StateEvent, "room_id">;

export type State = {
  events?: StateEventWithoutRoomId[];
};

export type RoomSummary = {
  "m.heroes"?: string[];
  "m.invited_member_count"?: number;
  "m.joined_member_count"?: number;
};

export type Timeline = {
  events: TimelineEventWithoutRoomId[];
  limited?: boolean;
  prev_batch?: string;
};

export type UnreadNotificationCounts = {
  highlight_count?: number;
  notification_count?: number;
};

export type ThreadNotificationCounts = Record<string, UnreadNotificationCounts>;

export type JoinedRoom = {
  account_data?: SyncAccountData;
  ephemeral?: Ephemeral;
  state?: State;
  summary?: RoomSummary;
  timeline?: Timeline;
  unread_notifications?: UnreadNotificationCounts;
  unread_thread_notifications?: ThreadNotificationCounts;
};

export type KnockState = {
  events?: StrippedStateEvent[];
};

export type KnockedRoom = {
  knock_state?: KnockState;
};

export type LeftRoom = {
  account_data?: SyncAccountData;
  state?: State;
  timeline?: Timeline;
};

export type SyncRooms = {
  invite?: Record<string, InvitedRoom>;
  join?: Record<string, JoinedRoom>;
  knock?: Record<string, KnockedRoom>;
  leave?: Record<string, LeftRoom>;
};

export type ToDeviceEvent<Content extends object = object> = {
  content: Content;
  sender: string;
  type: string;
};

export type SyncToDevice = {
  events?: ToDeviceEvent[];
};

/**
 * sync types
 */
export type SyncSearchParams = {
  filter?: string;
  full_state?: string;
  set_presence?: Presence;
  since?: string;
  timeout?: string;
};

export type SyncOK = {
  account_data?: SyncAccountData;
  device_lists?: SyncDeviceLists;
  device_one_time_keys_count?: Record<string, number>;
  next_batch: string;
  presence?: SyncPresence;
  rooms?: SyncRooms;
  to_device?: SyncToDevice;
};
