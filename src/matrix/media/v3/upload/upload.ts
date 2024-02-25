import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  PostUploadBody,
  PostUploadSearchParams,
  PutUploadBody,
  PutUploadPathParams,
  PutUploadSearchParams,
} from "./upload.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixmediav3upload
 */
export const postUpload = (
  body: PostUploadBody,
  searchParams?: PostUploadSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams("/_matrix/media/v3/upload", sParams.toString());

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixmediav3uploadservernamemediaid
 */
export const putUpload = (
  pathParams: PutUploadPathParams,
  body: PutUploadBody,
  searchParams?: PutUploadSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/media/v3/upload/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    sParams.toString(),
  );

  return {
    method: "PUT",
    path,
    rateLimited: true,
    body,
  };
};
