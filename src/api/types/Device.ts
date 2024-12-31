type ConnectionInfo = {
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

export type Device = {
  device_id: string;
  display_name?: string;
  last_seen_ip?: string;
  last_seen_ts?: number;
};

export type ToDeviceEvent<Content extends object = object> = {
  content: Content;
  sender: string;
  type: string;
};
