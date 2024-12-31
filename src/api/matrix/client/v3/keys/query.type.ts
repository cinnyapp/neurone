import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { CrossSigningKey, DeviceKeysInformation } from "../../../../types";

/**
 * postQuery types
 */
export type PostQueryBody = {
  device_keys: Record<string, string[]>;
  timeout?: number;
};
export type PostQueryOK = {
  device_keys?: Record<string, Record<string, DeviceKeysInformation>>;
  failures?: Record<string, object>;
  master_keys?: Record<string, CrossSigningKey>;
  self_signing_keys?: Record<string, CrossSigningKey>;
  user_signing_keys?: Record<string, CrossSigningKey>;
};
export type PostQueryEndpoint = MatrixEndpoint<{
  body: PostQueryBody;
}>;
