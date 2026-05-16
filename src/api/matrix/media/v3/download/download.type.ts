import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getDownload types
 */
export type GetDownloadPathParams = {
  serverName: string;
  mediaId: string;
};
export type GetDownloadSearchParams = {
  allow_redirect?: boolean;
  allow_remote?: boolean;
  timeout_ms?: number;
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
  allow_redirect?: boolean;
  allow_remote?: boolean;
  timeout_ms?: number;
};
export type GetDownloadFileEndpoint = MatrixEndpoint<{
  pathParams: GetDownloadFilePathParams;
  searchParams?: GetDownloadFileSearchParams;
}>;
