import { MatrixRequestStruct } from "../../../MatrixRequestStruct";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3logoutall
 */
export const postAll = (): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/logout/all";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
  };
};
