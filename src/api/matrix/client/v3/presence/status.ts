import { GetStatusEndpoint, PutStatusEndpoint } from "./status.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3presenceuseridstatus
 */
export const getStatus: GetStatusEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/presence/${encodeURIComponent(pathParams.userId)}/status`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3presenceuseridstatus
 */
export const putStatus: PutStatusEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/presence/${encodeURIComponent(pathParams.userId)}/status`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
