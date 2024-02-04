/**
 * room types
 */
export type RoomPathParams = {
  roomAlias: string;
};
export type RoomOK = {
  room_id?: string;
  servers?: string[];
};

/**
 * putRoom type
 */
export type PutRoomPathParams = {
  roomAlias: string;
};

export type PutRoomBody = {
  room_id: string;
};
export type PutRoomOK = Record<string, never>;

/**
 * deleteRoom type
 */
export type DeleteRoomPathParams = {
  roomAlias: string;
};
export type DeleteRoomOK = {
  roomAlias: string;
};
