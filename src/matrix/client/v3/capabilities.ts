import { MatrixRequestStruct } from "../../MatrixRequestStruct";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3capabilities
 */
export const capabilities = (): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/capabilities";

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
