import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ThumbnailMethod } from "../../../../types";

/**
 * getThumbnail types
 */
export type GetThumbnailPathParams = {
  serverName: string;
  mediaId: string;
};
export type GetThumbnailSearchParams = {
  allow_redirect?: string;
  allow_remote?: string;
  height: string;
  method?: ThumbnailMethod;
  timeout_ms?: string;
  width: string;
};
export type GetThumbnailEndpoint = MatrixEndpoint<{
  pathParams: GetThumbnailPathParams;
  searchParams: GetThumbnailSearchParams;
}>;
