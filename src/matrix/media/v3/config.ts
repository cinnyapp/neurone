import { MatrixRequestStruct } from "../../MatrixRequestStruct";

export const config = (): MatrixRequestStruct => {
  const path = "/_matrix/media/v3/config";

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
