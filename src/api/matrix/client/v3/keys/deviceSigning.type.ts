import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { CrossSigningKey } from "../../../../types";

/**
 * postDeviceSigningUpload types
 */
export type PostDeviceSigningUploadBody = {
  auth?: object;
  master_key?: CrossSigningKey;
  self_signing_key?: CrossSigningKey;
  user_signing_key?: CrossSigningKey;
};
export type PostDeviceSigningUploadOK = Record<string, never>;
export type PostDeviceSigningUploadEndpoint = MatrixEndpoint<{
  body: PostDeviceSigningUploadBody;
}>;
