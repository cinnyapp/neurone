export type ThumbnailMethod = "crop" | "scale";

/**
 * thumbnail types
 */
export type ThumbnailPathParams = {
  serverName: string;
  mediaId: string;
};
export type ThumbnailSearchParams = {
  allow_redirect?: string;
  allow_remote?: string;
  height: string;
  method?: ThumbnailMethod;
  timeout_ms?: string;
  width: string;
};
