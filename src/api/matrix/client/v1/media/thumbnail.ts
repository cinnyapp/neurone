import { withSearchParams } from "../../../../utils";
import { GetThumbnailEndpoint } from "./thumbnail.type";

/**
 * https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediathumbnailservernamemediaid
 */
export const getThumbnail: GetThumbnailEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/media/thumbnail/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
