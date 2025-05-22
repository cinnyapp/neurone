import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import {
  AccountDataEvent,
  ClientEventWithoutRoomId,
  EphemeralEvent,
  Presence,
  PresenceEvent,
  RoomSummary,
  StateEventWithoutRoomId,
  StrippedStateEvent,
  ToDeviceEvent,
  UnreadNotificationCounts,
} from "../../../../types";

export type Timeline = {
  events: ClientEventWithoutRoomId[];
  limited?: boolean;
  prev_batch?: string;
};

export type InvitedRoom = {
  invite_state?: {
    events?: StrippedStateEvent[];
  };
};

export type JoinedRoom = {
  account_data?: {
    events?: AccountDataEvent[];
  };
  ephemeral?: {
    events?: EphemeralEvent[];
  };
  state?: {
    events?: StateEventWithoutRoomId[];
  };
  summary?: RoomSummary;
  timeline?: Timeline;
  unread_notifications?: UnreadNotificationCounts;
  unread_thread_notifications?: Record<string, UnreadNotificationCounts>;
};

export type KnockedRoom = {
  knock_state?: {
    events?: StrippedStateEvent[];
  };
};

export type LeftRoom = {
  account_data?: {
    events?: AccountDataEvent[];
  };
  state?: {
    events?: StateEventWithoutRoomId[];
  };
  timeline?: Timeline;
};

/**
 * getSync types
 */
export type GetSyncSearchParams = {
  filter?: string;
  full_state?: string;
  set_presence?: Presence;
  since?: string;
  timeout?: string;
};

export type GetSyncOK = {
  account_data?: {
    events?: AccountDataEvent[];
  };
  device_lists?: {
    changed: string[];
    left: string[];
  };
  device_one_time_keys_count?: Record<string, number>;
  next_batch: string;
  presence?: {
    events?: PresenceEvent[];
  };
  rooms?: {
    invite?: Record<string, InvitedRoom>;
    join?: Record<string, JoinedRoom>;
    knock?: Record<string, KnockedRoom>;
    leave?: Record<string, LeftRoom>;
  };
  to_device?: {
    events?: ToDeviceEvent[];
  };
};

export type GetSyncEndpoint = MatrixEndpoint<{
  searchParams?: GetSyncSearchParams;
}>;
