import { MatrixRequestStruct } from "../../MatrixRequestStruct";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3joined_rooms
 */
export const joinedRooms = (): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/joined_rooms`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
