import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostQueryBody } from "./query.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3keysquery
 */
export const postQuery = (body: PostQueryBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/keys/query";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
