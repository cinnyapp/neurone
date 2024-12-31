import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getRoom types
 */
export type GetRoomPathParams = {
  roomAlias: string;
};
export type GetRoomOK = {
  room_id?: string;
  servers?: string[];
};
export type GetRoomEndpoint = MatrixEndpoint<{
  pathParams: GetRoomPathParams;
}>;

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
export type PutRoomEndpoint = MatrixEndpoint<{
  pathParams: PutRoomPathParams;
  body: PutRoomBody;
}>;

/**
 * deleteRoom type
 */
export type DeleteRoomPathParams = {
  roomAlias: string;
};
export type DeleteRoomOK = {
  roomAlias: string;
};
export type DeleteRoomEndpoint = MatrixEndpoint<{
  pathParams: DeleteRoomPathParams;
}>;
