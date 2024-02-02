export type Presence = "online" | "offline" | "unavailable";

export type StatusContent = {
  currently_active?: boolean;
  last_active_ago?: number;
  presence: Presence;
  status_msg?: string | null;
};

/**
 * status types
 */
export type StatusPathParams = {
  userId: string;
};

export type StatusOK = StatusContent;

/**
 * putStatus
 */
export type PutStatusPathParams = {
  userId: string;
};

export type PutStatusBody = {
  presence: Presence;
  status?: string;
};

export type PutStatusOK = Record<string, never>;
