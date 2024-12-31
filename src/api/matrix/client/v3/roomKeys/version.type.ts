import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { BackupVersionInfo } from "../../../../types";

/**
 * getVersion type
 */
export type GetVersionOK = BackupVersionInfo;
export type GetVersionEndpoint = MatrixEndpoint<object>;

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
export type PostVersionEndpoint = MatrixEndpoint<{
  body: PostVersionBody;
}>;

/**
 * getVersionVersion type
 */
export type GetVersionVersionPathParams = {
  version: string;
};
export type GetVersionVersionOK = BackupVersionInfo;
export type GetVersionVersionEndpoint = MatrixEndpoint<{
  pathParams: GetVersionVersionPathParams;
}>;

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
export type PutVersionVersionEndpoint = MatrixEndpoint<{
  pathParams: PutVersionVersionPathParams;
  body: PutVersionVersionBody;
}>;

/**
 * deleteVersionVersion types
 */
export type DeleteVersionVersionPathParams = {
  version: string;
};
export type DeleteVersionVersionOK = Record<string, never>;
export type DeleteVersionVersionEndpoint = MatrixEndpoint<{
  pathParams: DeleteVersionVersionPathParams;
}>;
