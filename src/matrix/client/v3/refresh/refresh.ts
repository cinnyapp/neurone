import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostRefreshBody } from "./refresh.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3refresh
 */
export const postRefresh = (body: PostRefreshBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/login/refresh";

  return {
    method: "POST",
    path,
    rateLimited: true,
    body: JSON.stringify(body),
  };
};
