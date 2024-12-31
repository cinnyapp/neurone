import { PostClaimEndpoint } from "./claim.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3keysclaim
 */
export const postClaim: PostClaimEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/keys/claim";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
