/**
 * download types
 */
export type DownloadPathParams = {
  serverName: string;
  mediaId: string;
};
export type DownloadSearchParams = {
  allow_redirect?: string;
  allow_remote?: string;
  timeout_ms?: string;
};

/**
 * downloadFile types
 */
export type DownloadFilePathParams = {
  serverName: string;
  mediaId: string;
  fileName: string;
};
export type DownloadFileSearchParams = {
  allow_redirect?: string;
  allow_remote?: string;
  timeout_ms?: string;
};
