import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { KeyBackupData, RoomKeyBackup } from "../../../../types";

/**
 * getKeys types
 */
export type GetKeysSearchParams = {
  version: string;
};
export type GetKeysOK = {
  rooms: Record<string, RoomKeyBackup>;
};
export type GetKeysEndpoint = MatrixEndpoint<{
  searchParams: GetKeysSearchParams;
}>;

/**
 * putKeys types
 */
export type PutKeysSearchParams = {
  version: string;
};
export type PutKeysBody = {
  rooms: Record<string, RoomKeyBackup>;
};
export type PutKeysOK = {
  count: number;
  etag: string;
};
export type PutKeysEndpoint = MatrixEndpoint<{
  searchParams: PutKeysSearchParams;
  body: PutKeysBody;
}>;

/**
 * deleteKeys types
 */
export type DeleteKeysSearchParams = {
  version: string;
};
export type DeleteKeysOK = {
  count: number;
  etag: string;
};
export type DeleteKeysEndpoint = MatrixEndpoint<{
  searchParams: DeleteKeysSearchParams;
}>;

/**
 * getKeysRoomId types
 */
export type GetKeysRoomIdPathParams = {
  roomId: string;
};
export type GetKeysRoomIdSearchParams = {
  version: string;
};
export type GetKeysRoomIdOK = RoomKeyBackup;
export type GetKeysRoomIdEndpoint = MatrixEndpoint<{
  pathParams: GetKeysRoomIdPathParams;
  searchParams: GetKeysRoomIdSearchParams;
}>;

/**
 * putKeysRoomId types
 */
export type PutKeysRoomIdPathParams = {
  roomId: string;
};
export type PutKeysRoomIdSearchParams = {
  version: string;
};
export type PutKeysRoomIdBody = RoomKeyBackup;
export type PutKeysRoomIdOK = {
  count: number;
  etag: string;
};
export type PutKeysRoomIdEndpoint = MatrixEndpoint<{
  pathParams: PutKeysRoomIdPathParams;
  searchParams: PutKeysRoomIdSearchParams;
  body: PutKeysRoomIdBody;
}>;

/**
 * deleteKeysRoomId types
 */
export type DeleteKeysRoomIdPathParams = {
  roomId: string;
};
export type DeleteKeysRoomIdSearchParams = {
  version: string;
};
export type DeleteKeysRoomIdOK = {
  count: number;
  etag: string;
};
export type DeleteKeysRoomIdEndpoint = MatrixEndpoint<{
  pathParams: DeleteKeysRoomIdPathParams;
  searchParams: DeleteKeysRoomIdSearchParams;
}>;

/**
 * getKeysRoomIdSessionId types
 */
export type GetKeysRoomIdSessionIdPathParams = {
  roomId: string;
  sessionId: string;
};
export type GetKeysRoomIdSessionIdSearchParams = {
  version: string;
};
export type GetKeysRoomIdSessionIdOK = KeyBackupData;
export type GetKeysRoomIdSessionIdEndpoint = MatrixEndpoint<{
  pathParams: GetKeysRoomIdSessionIdPathParams;
  searchParams: GetKeysRoomIdSessionIdSearchParams;
}>;

/**
 * putKeysRoomIdSessionId types
 */
export type PutKeysRoomIdSessionIdPathParams = {
  roomId: string;
  sessionId: string;
};
export type PutKeysRoomIdSessionIdSearchParams = {
  version: string;
};
export type PutKeysRoomIdSessionIdBody = KeyBackupData;
export type PutKeysRoomIdSessionIdOK = {
  count: number;
  etag: string;
};
export type PutKeysRoomIdSessionIdEndpont = MatrixEndpoint<{
  pathParams: PutKeysRoomIdSessionIdPathParams;
  searchParams: PutKeysRoomIdSessionIdSearchParams;
  body: PutKeysRoomIdSessionIdBody;
}>;

/**
 * deleteKeysRoomId types
 */
export type DeleteKeysRoomIdSessionIdPathParams = {
  roomId: string;
  sessionId: string;
};
export type DeleteKeysRoomIdSessionIdSearchParams = {
  version: string;
};
export type DeleteKeysRoomIdSessionIdOK = {
  count: number;
  etag: string;
};
export type DeleteKeysRoomIdSessionIdEndopint = MatrixEndpoint<{
  pathParams: DeleteKeysRoomIdSessionIdPathParams;
  searchParams: DeleteKeysRoomIdSessionIdSearchParams;
}>;
