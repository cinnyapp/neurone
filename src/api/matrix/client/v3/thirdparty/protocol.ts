import { GetProtocolEndpoint, GetProtocolsEndpoint } from "./protocol.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3thirdpartyprotocolprotocol
 */
export const getProtocol: GetProtocolEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/thirdparty/protocol/${encodeURIComponent(pathParams.protocol)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3thirdpartyprotocols
 */
export const getProtocols: GetProtocolsEndpoint = () => {
  const path = "/_matrix/client/v3/thirdparty/protocols";

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
