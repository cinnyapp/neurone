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

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3logoutall
 */
export const postLogoutAll = (): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/logout/all";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
  };
};
