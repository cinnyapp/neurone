import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostOpenidRequestTokenPathParams } from "./openidRequestToken.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3useruseridopenidrequest_token
 */
export const postOpenidRequestToken = (
  pathParams: PostOpenidRequestTokenPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/openid/request_token`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
