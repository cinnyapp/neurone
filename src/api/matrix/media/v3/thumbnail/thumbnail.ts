import { withSearchParams } from "../../../../utils";
import { GetThumbnailEndpoint } from "./thumbnail.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixmediav3thumbnailservernamemediaid
 */
export const getThumbnail: GetThumbnailEndpoint = ({
  pathParams,
  searchParams,
}) => {
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
