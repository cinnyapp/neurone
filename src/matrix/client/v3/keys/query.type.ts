import { CrossSigningKey } from "./deviceSigning.type";

export type UserIdToDevices = Record<string, string[]>;

export type AlgorithmDeviceIdToSignatures = Record<string, string>;
export type UserIdDeviceSignatures = Record<
  string,
  AlgorithmDeviceIdToSignatures
>;

export type UnsignedDeviceInfo = [device_display_name: string];

export type DeviceInformation = {
  algorithms: string[];
  device_id: string;
  keys: Record<string, string>;
  signatures: UserIdDeviceSignatures;
  unsigned: UnsignedDeviceInfo;
  user_id: string;
};

export type DeviceIdToDeviceInfo = Record<string, DeviceInformation>;
export type UserIdToDevicesInfo = Record<string, DeviceIdToDeviceInfo>;

/**
 * postQuery types
 */
export type PostQueryBody = {
  device_keys: UserIdToDevices;
  timeout?: number;
};
export type PostQueryOK = {
  device_keys?: UserIdToDevicesInfo;
  failures?: Record<string, object>;
  master_keys?: Record<string, CrossSigningKey>;
  self_signing_keys?: Record<string, CrossSigningKey>;
  user_signing_keys?: Record<string, CrossSigningKey>;
};
