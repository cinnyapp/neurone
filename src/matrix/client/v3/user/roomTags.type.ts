export type RoomTagContent = {
  order: number;
};

export type RoomTags = Record<string, RoomTagContent>;

/**
 * roomTags types
 */
export type RoomTagsPathParams = {
  userId: string;
  roomId: string;
};

export type RoomTagsOK = {
  tags: RoomTags;
};

/**
 * putRoomTag types
 */
export type PutRoomTagPathParams = {
  userId: string;
  roomId: string;
  tag: string;
};

export type PutRoomTagBody = RoomTagContent;

export type PutRoomTagOK = Record<string, never>;

/**
 * deleteRoomTag types
 */
export type DeleteRoomTagPathParams = {
  userId: string;
  roomId: string;
  tag: string;
};

export type DeleteRoomTagOK = Record<string, never>;
