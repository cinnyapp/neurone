import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postUpload types
 */
export type PostUploadSearchParams = {
  filename?: string;
};
export type PostUploadBody = FormData | Blob;
export type PostUploadOK = {
  content_uri: string;
};
export type PostUploadEndpoint = MatrixEndpoint<{
  searchParams?: PostUploadSearchParams;
  body: PostUploadBody;
}>;

/**
 * putUpload types
 */
export type PutUploadPathParams = {
  serverName: string;
  mediaId: string;
};
export type PutUploadSearchParams = {
  filename?: string;
};
export type PutUploadBody = FormData | Blob;
export type PutUploadOK = Record<string, never>;
export type PutUploadEndpoint = MatrixEndpoint<{
  pathParams: PutUploadPathParams;
  searchParams?: PutUploadSearchParams;
  body: PutUploadBody;
}>;
