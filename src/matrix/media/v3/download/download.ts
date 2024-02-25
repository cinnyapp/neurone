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
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/media/v3/download/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    sParams.toString(),
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
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/media/v3/download/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}/${encodeURIComponent(pathParams.fileName)}`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
  };
};
