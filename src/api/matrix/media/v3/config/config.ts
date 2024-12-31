import { GetConfigEndpoint } from "./config.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixmediav3config
 */
export const getConfig: GetConfigEndpoint = () => {
  const path = "/_matrix/media/v3/config";

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
