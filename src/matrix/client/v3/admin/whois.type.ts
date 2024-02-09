export type ConnectionInfo = {
  ip?: string;
  last_seen?: number;
  user_agent?: string;
};

export type SessionInfo = {
  connections?: ConnectionInfo[];
};

export type DeviceInfo = {
  sessions?: SessionInfo[];
};

/**
 * whois types
 */
export type WhoisPathParams = {
  userId: string;
};
export type WhoisOK = {
  devices?: Record<string, DeviceInfo>;
  user_id?: string;
};
