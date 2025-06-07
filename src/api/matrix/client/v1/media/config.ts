import { GetConfigEndpoint } from "./config.type";

/**
 * https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediaconfig
 */
export const getConfig: GetConfigEndpoint = () => {
  const path = "/_matrix/client/v1/media/config";

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
