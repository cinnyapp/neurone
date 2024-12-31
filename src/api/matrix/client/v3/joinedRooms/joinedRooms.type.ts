import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getJoinedRooms types
 */
export type GetJoinedRoomsOK = {
  joined_rooms: string[];
};
export type GetJoinedRoomsEndpoint = MatrixEndpoint<object>;
