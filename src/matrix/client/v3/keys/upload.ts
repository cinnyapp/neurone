import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostUploadBody } from "./upload.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3keysupload
 */
export const postUpload = (body: PostUploadBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/keys/upload";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
