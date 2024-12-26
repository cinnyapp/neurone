import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  DownloadFilePathParams,
  DownloadFileSearchParams,
  DownloadPathParams,
  DownloadSearchParams,
} from "./download.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixmediav3downloadservernamemediaid
 */
export const download = (
  pathParams: DownloadPathParams,
  searchParams?: DownloadSearchParams,
): MatrixRequestStruct => {
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
export const downloadFile = (
  pathParams: DownloadFilePathParams,
  searchParams?: DownloadFileSearchParams,
): MatrixRequestStruct => {
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
