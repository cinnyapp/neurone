import { withSearchParams } from "../../../../utils";
import { PostUploadEndpoint, PutUploadEndpoint } from "./upload.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixmediav3upload
 */
export const postUpload: PostUploadEndpoint = ({ body, searchParams }) => {
  const path = withSearchParams("/_matrix/media/v3/upload", searchParams);

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
export const putUpload: PutUploadEndpoint = ({
  pathParams,
  body,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/media/v3/upload/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    searchParams,
  );

  return {
    method: "PUT",
    path,
    rateLimited: true,
    body,
  };
};
