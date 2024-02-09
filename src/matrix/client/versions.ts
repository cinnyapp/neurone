import { MatrixRequestStruct } from "../MatrixRequestStruct";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientversions
 */
export const versions = (): MatrixRequestStruct => {
  const path = "/_matrix/client/versions";

  return {
    method: "GET",
    path,
  };
};
