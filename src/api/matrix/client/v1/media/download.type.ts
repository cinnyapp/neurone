import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getDownload types
 */
export type GetDownloadPathParams = {
  serverName: string;
  mediaId: string;
};
export type GetDownloadSearchParams = {
  timeout_ms?: string;
};

export type GetDownloadEndpoint = MatrixEndpoint<{
  pathParams: GetDownloadPathParams;
  searchParams?: GetDownloadSearchParams;
}>;

/**
 * getDownloadFile types
 */
export type GetDownloadFilePathParams = {
  serverName: string;
  mediaId: string;
  fileName: string;
};
export type GetDownloadFileSearchParams = {
  timeout_ms?: string;
};
export type GetDownloadFileEndpoint = MatrixEndpoint<{
  pathParams: GetDownloadFilePathParams;
  searchParams?: GetDownloadFileSearchParams;
}>;
