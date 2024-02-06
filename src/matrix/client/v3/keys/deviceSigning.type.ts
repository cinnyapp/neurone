export type AuthenticationData = {
  session?: string;
  type?: string;
} & object;

export type Signatures = Record<string, Record<string, string>>;

export type CrossSigningKey = {
  keys: Record<string, string>;
  signatures?: Signatures;
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
