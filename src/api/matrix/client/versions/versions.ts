import { GetVersionsEndpoint } from "./versions.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientversions
 */
export const getVersions: GetVersionsEndpoint = () => {
  const path = "/_matrix/client/versions";

  return {
    method: "GET",
    path,
  };
};
