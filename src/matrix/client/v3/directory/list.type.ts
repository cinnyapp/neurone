export type RoomVisibility = "public" | "private";

/**
 * listRoom types
 */
export type ListRoomPathParams = {
  roomId: string;
};
export type ListRoomOK = {
  visibility: RoomVisibility;
};

/**
 * putListRoom types
 */
export type PutListRoomPathParams = {
  roomId: string;
};
export type PutListRoomBody = {
  visibility: RoomVisibility;
};
export type PutListRoomOK = Record<string, never>;
