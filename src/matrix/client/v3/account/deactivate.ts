import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostDeactivateBody } from "./deactivate.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3accountdeactivate
 */
export const postDeactivate = (
  body?: PostDeactivateBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/deactivate";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
