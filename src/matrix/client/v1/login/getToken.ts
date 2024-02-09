import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostGetTokenBody } from "./getToken.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv1loginget_token
 */
export const postGetToken = (body?: PostGetTokenBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v1/login/get_token";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
