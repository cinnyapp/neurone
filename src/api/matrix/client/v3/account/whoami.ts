import { GetWhoamiEndpoint } from "./whoami.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3accountwhoami
 */
export const getWhoami: GetWhoamiEndpoint = () => {
  const path = "/_matrix/client/v3/account/whoami";

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
