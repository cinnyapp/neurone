import { PostSignaturesUploadEndpoint } from "./signatures.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3keyssignaturesupload
 */
export const postSignaturesUpload: PostSignaturesUploadEndpoint = ({
  body,
}) => {
  const path = "/_matrix/client/v3/keys/signatures/upload";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
