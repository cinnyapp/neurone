import { Presence } from "../presence/status.type";

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
  account_data?: {
    events: {
      content: object;
      type: string;
    }[];
  };
  device_lists?: unknown;
  device_one_time_keys_count?: unknown;
  next_batch: string;
  presence?: unknown;
  rooms?: unknown[];
  to_device?: unknown;
};
