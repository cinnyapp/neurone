export type AuthenticationData = {
  session?: string;
  type?: string;
} & object;

export type CrossSigningKey = {
  keys: Record<string, string>;
  signatures?: Record<string, Record<string, string>>;
  usage: string[];
  user_id: string;
};

/**
 * postDeviceSigningUpload types
 */
export type PostDeviceSigningUploadBody = {
  auth?: AuthenticationData;
  master_key?: CrossSigningKey;
  self_signing_key?: CrossSigningKey;
  user_signing_key?: CrossSigningKey;
};
export type PostDeviceSigningUploadOK = Record<string, never>;
