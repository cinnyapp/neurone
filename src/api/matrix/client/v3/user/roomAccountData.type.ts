import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getRoomAccountData types
 */
export type GetRoomAccountDataPathParams = {
  userId: string;
  roomId: string;
  type: string;
};

export type GetRoomAccountDataOK<Content extends object> = Content;
export type GetRoomAccountDataEndpoint = MatrixEndpoint<{
  pathParams: GetRoomAccountDataPathParams;
}>;

/**
 * putRoomAccountData types
 */
export type PutRoomAccountDataPathParams = {
  userId: string;
  roomId: string;
  type: string;
};

export type PutRoomAccountDataBody = object;

export type PutRoomAccountDataOK = Record<string, never>;
export type PutRoomAccountDataEndpoint = MatrixEndpoint<{
  pathParams: PutRoomAccountDataPathParams;
  body: PutRoomAccountDataBody;
}>;
