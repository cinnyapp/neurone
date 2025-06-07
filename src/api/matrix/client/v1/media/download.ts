import { withSearchParams } from "../../../../utils";
import { GetDownloadEndpoint, GetDownloadFileEndpoint } from "./download.type";

/**
 * https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediadownloadservernamemediaid
 */
export const getDownload: GetDownloadEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/media/download/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediadownloadservernamemediaidfilename
 */
export const getDownloadFile: GetDownloadFileEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/media/download/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}/${encodeURIComponent(pathParams.fileName)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
