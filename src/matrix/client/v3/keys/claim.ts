import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostClaimBody } from "./claim.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3keysclaim
 */
export const postClaim = (body: PostClaimBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/keys/claim";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
