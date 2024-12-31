import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { RoomTagContent } from "../../../../types";

/**
 * getRoomTags types
 */
export type GetRoomTagsPathParams = {
  userId: string;
  roomId: string;
};

export type GetRoomTagsOK = {
  tags: Record<string, RoomTagContent>;
};

export type GetRoomTagsEndpoint = MatrixEndpoint<{
  pathParams: GetRoomTagsPathParams;
}>;

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

export type PutRoomTagEndpoint = MatrixEndpoint<{
  pathParams: PutRoomTagPathParams;
  body: PutRoomTagBody;
}>;

/**
 * deleteRoomTag types
 */
export type DeleteRoomTagPathParams = {
  userId: string;
  roomId: string;
  tag: string;
};

export type DeleteRoomTagOK = Record<string, never>;

export type DeleteRoomTagEndpoint = MatrixEndpoint<{
  pathParams: DeleteRoomTagPathParams;
}>;
