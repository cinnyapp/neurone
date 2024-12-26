import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { ThumbnailPathParams, ThumbnailSearchParams } from "./thumbnail.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixmediav3thumbnailservernamemediaid
 */
export const thumbnail = (
  pathParams: ThumbnailPathParams,
  searchParams: ThumbnailSearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams(
    `/_matrix/media/v3/thumbnail/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
  };
};
