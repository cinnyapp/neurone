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
  animated?: boolean;
  height: number;
  method?: ThumbnailMethod;
  timeout_ms?: number;
  width: number;
};
export type GetThumbnailEndpoint = MatrixEndpoint<{
  pathParams: GetThumbnailPathParams;
  searchParams: GetThumbnailSearchParams;
}>;
