export type VersionInfo = {
  algorithm: string;
  auth_data: object;
  count: number;
  etag: string;
  version: string;
};

/**
 * version type
 */
export type VersionOK = VersionInfo;

/**
 * postVersion
 */
export type PostVersionBody = {
  algorithm: string;
  auth_data: object;
};
export type PostVersionOK = {
  version: string;
};

/**
 * versionVersion type
 */
export type VersionVersionPathParams = {
  version: string;
};
export type VersionVersionOK = VersionInfo;

/**
 * putVersionVersion types
 */
export type PutVersionVersionPathParams = {
  version: string;
};
export type PutVersionVersionBody = {
  algorithm: string;
  auth_data: object;
  version?: string;
};
export type PutVersionVersionOK = Record<string, never>;

/**
 * deleteVersionVersion types
 */
export type DeleteVersionVersionPathParams = {
  version: string;
};
export type DeleteVersionVersionOK = Record<string, never>;
