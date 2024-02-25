import { MatrixRequestStruct } from "../../MatrixRequestStruct";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixmediav1create
 */
export const postCreate = (): MatrixRequestStruct => {
  const path = "/_matrix/media/v1/create";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
