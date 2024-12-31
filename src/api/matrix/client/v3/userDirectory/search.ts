import { PostSearchEndpoint } from "./search.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3user_directorysearch
 */
export const postSearch: PostSearchEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/user_directory/search";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
