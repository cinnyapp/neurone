import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostSignaturesUploadBody } from "./signatures.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3keyssignaturesupload
 */
export const postSignaturesUpload = (
  body: PostSignaturesUploadBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/keys/signatures/upload";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
