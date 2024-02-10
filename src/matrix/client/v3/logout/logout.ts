import { MatrixRequestStruct } from "../../../MatrixRequestStruct";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3logout
 */
export const postLogout = (): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/logout";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
  };
};
