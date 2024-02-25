export type Device = {
  device_id: string;
  display_name?: string;
  last_seen_ip?: string;
  last_seen_ts?: number;
};

/**
 * devices types
 */
export type DevicesOK = {
  devices: Device[];
};

/**
 * device types
 */
export type DevicePathParams = {
  deviceId: string;
};

export type DeviceOK = Device;

/**
 * putDevice types
 */

export type PutDevicePathParams = {
  deviceId: string;
};
export type PutDeviceBody = {
  display_name?: string;
};
export type PutDeviceOK = Record<string, never>;

/**
 * deleteDevice types
 */
export type DeleteDevicePathParams = {
  deviceId: string;
};
export type DeleteDeviceBody = {
  auth?: object;
};
export type DeleteDeviceOK = Record<string, never>;
