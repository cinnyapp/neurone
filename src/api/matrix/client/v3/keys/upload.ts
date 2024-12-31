import { PostUploadEndpoint } from "./upload.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3keysupload
 */
export const postUpload: PostUploadEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/keys/upload";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
