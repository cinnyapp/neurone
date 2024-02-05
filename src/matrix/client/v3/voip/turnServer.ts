import { MatrixRequestStruct } from "../../../MatrixRequestStruct";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3voipturnserver
 */
export const turnServer = (): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/voip/turnServer`;

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
