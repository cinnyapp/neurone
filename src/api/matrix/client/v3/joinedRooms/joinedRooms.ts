import { GetJoinedRoomsEndpoint } from "./joinedRooms.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3joined_rooms
 */
export const getJoinedRooms: GetJoinedRoomsEndpoint = () => {
  const path = `/_matrix/client/v3/joined_rooms`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
