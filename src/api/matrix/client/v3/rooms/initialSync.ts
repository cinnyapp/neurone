import { GetInitialSyncEndpoint } from "./initialSync.type";

/**
 * https://spec.matrix.org/v1.14/client-server-api/#get_matrixclientv3roomsroomidinitialsync
 */
export const getInitialSync: GetInitialSyncEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/initialSync`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
