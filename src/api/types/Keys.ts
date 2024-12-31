export type KeyObject = {
  key: string;
  signatures: Record<string, object>;
};

export type OneTimeKeys = Record<string, string | KeyObject>;
export type DeviceIdToOneTimeKeys = Record<string, OneTimeKeys>;
export type UserIdToDevicesOneTimeKeys = Record<string, DeviceIdToOneTimeKeys>;

export type CrossSigningKey = {
  keys: Record<string, string>;
  signatures?: Record<string, Record<string, string>>;
  usage: string[];
  user_id: string;
};

export type UnsignedDeviceInfo = { device_display_name: string };

export type DeviceKeys = {
  algorithms: string[];
  device_id: string;
  keys: Record<string, string>;
  signatures: Record<string, Record<string, string>>;
  user_id: string;
};

export type DeviceKeysInformation = DeviceKeys & {
  unsigned: UnsignedDeviceInfo;
};
