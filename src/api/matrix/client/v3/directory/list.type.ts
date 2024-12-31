import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { DirectoryRoomVisibility } from "../../../../types";

/**
 * getListRoom types
 */
export type GetListRoomPathParams = {
  roomId: string;
};
export type GetListRoomOK = {
  visibility: DirectoryRoomVisibility;
};
export type GetListRoomEndpoint = MatrixEndpoint<{
  pathParams: GetListRoomPathParams;
}>;

/**
 * putListRoom types
 */
export type PutListRoomPathParams = {
  roomId: string;
};
export type PutListRoomBody = {
  visibility: DirectoryRoomVisibility;
};
export type PutListRoomOK = Record<string, never>;
export type PutListRoomEndpoint = MatrixEndpoint<{
  pathParams: PutListRoomPathParams;
  body: PutListRoomBody;
}>;
