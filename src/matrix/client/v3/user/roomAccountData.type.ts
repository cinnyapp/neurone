/**
 * roomAccountData types
 */
export type RoomAccountDataPathParams = {
  userId: string;
  roomId: string;
  type: string;
};

export type RoomAccountDataOK<Content extends object> = Content;

/**
 * putRoomAccountData types
 */
export type PutRoomAccountDataPathParams = {
  userId: string;
  roomId: string;
  type: string;
};

export type PutRoomAccountDataBody<Content extends object> = Content;

export type PutRoomAccountDataOK = Record<string, never>;
