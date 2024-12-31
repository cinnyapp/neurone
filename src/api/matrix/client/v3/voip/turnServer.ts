import { GetTurnServerEndpoint } from "./turnServer.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3voipturnserver
 */
export const getTurnServer: GetTurnServerEndpoint = () => {
  const path = `/_matrix/client/v3/voip/turnServer`;

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
