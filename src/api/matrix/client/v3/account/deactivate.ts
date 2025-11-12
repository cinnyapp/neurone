import { PostDeactivateEndpoint } from "./deactivate.type";

/**
 * https://spec.matrix.org/v1.10/client-server-api/#post_matrixclientv3accountdeactivate
 */
export const postDeactivate: PostDeactivateEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/account/deactivate";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body ?? {}),
  };
};
