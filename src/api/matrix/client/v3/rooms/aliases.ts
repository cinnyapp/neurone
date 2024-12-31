import { GetAliasesEndpoint } from "./aliases.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidaliases
 */
export const getAliases: GetAliasesEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/aliases`;

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
