import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import {
  AccountDataEvent,
  ClientEvent,
  DirectoryRoomVisibility,
  RoomMembership,
  StateEvent,
} from "../../../../types";

export type PaginationChunk = {
  chunk: [];
  end: string;
  start?: string;
};

export type RoomInfo = {
  account_data?: AccountDataEvent;
  membership?: RoomMembership;
  messages?: ClientEvent[];
  room_id: string;
  state?: StateEvent[];
  visibility?: DirectoryRoomVisibility;
};

/**
 * getInitialSync types
 */
export type GetInitialSyncPathParams = {
  roomId: string;
};
export type GetInitialSyncOK = Record<string, never>;
export type GetInitialSyncEndpoint = MatrixEndpoint<{
  pathParams: GetInitialSyncPathParams;
}>;
