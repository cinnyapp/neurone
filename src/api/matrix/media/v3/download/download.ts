import { withSearchParams } from "../../../../utils/withSearchParams";
import { GetDownloadEndpoint, GetDownloadFileEndpoint } from "./download.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixmediav3downloadservernamemediaid
 */
export const getDownload: GetDownloadEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/media/v3/download/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixmediav3downloadservernamemediaidfilename
 */
export const getDownloadFile: GetDownloadFileEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/media/v3/download/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}/${encodeURIComponent(pathParams.fileName)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
  };
};
