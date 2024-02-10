import { MatrixRequestStruct } from "../../../MatrixRequestStruct";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3accountwhoami
 */
export const whoami = (): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/whoami";

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
