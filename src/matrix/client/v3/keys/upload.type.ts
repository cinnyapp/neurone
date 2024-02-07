import { OneTimeKeys } from "./claim.type";
import { UserIdDeviceSignatures } from "./query.type";

export type DeviceKeys = {
  algorithms: string[];
  device_id: string;
  keys: Record<string, string>;
  signatures: UserIdDeviceSignatures;
  user_id: string;
};

/**
 * postUpload types
 */
export type PostUploadBody = {
  device_keys?: DeviceKeys;
  fallback_keys?: OneTimeKeys;
  one_time_keys?: OneTimeKeys;
};
export type PostUploadOK = {
  one_time_key_counts: Record<string, number>;
};
