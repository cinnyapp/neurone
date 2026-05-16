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

export type InviteRoom = {
  invite_state?: {
    events?: StrippedStateEvent[];
  };
};

export type JoinRoom = {
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

export type KnockRoom = {
  knock_state?: {
    events?: StrippedStateEvent[];
  };
};

export type LeaveRoom = {
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
  full_state?: boolean;
  set_presence?: Presence;
  since?: string;
  timeout?: number;
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
    invite?: Record<string, InviteRoom>;
    join?: Record<string, JoinRoom>;
    knock?: Record<string, KnockRoom>;
    leave?: Record<string, LeaveRoom>;
  };
  to_device?: {
    events?: ToDeviceEvent[];
  };
};

export type GetSyncEndpoint = MatrixEndpoint<{
  searchParams?: GetSyncSearchParams;
}>;
