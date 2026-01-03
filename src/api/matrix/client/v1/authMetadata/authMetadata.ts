import { GetAuthMetadataEndpoint } from "./authMetadata.type";

/**
 * https://spec.matrix.org/v1.15/client-server-api/#get_matrixclientv1auth_metadata
 */
export const getAuthMetadata: GetAuthMetadataEndpoint = () => {
  const path = "/_matrix/client/v1/auth_metadata";

  return {
    method: "GET",
    path,
  };
};
