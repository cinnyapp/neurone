import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { DeviceKeys, OneTimeKeys } from "../../../../types";

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
export type PostUploadEndpoint = MatrixEndpoint<{
  body: PostUploadBody;
}>;
