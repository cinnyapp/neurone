import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostSearchBody } from "./search.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3user_directorysearch
 */
export const postSearch = (body: PostSearchBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/user_directory/search";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
