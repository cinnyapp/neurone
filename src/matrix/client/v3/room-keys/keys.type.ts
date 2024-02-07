export type KeyBackupData = {
  first_message_index: number;
  forwarded_count: number;
  is_verified: boolean;
  session_data: object;
};

export type RoomKeyBackup = {
  sessions: Record<string, KeyBackupData>;
};

export type RoomIdToRoomKeyBackup = Record<string, RoomKeyBackup>;

/**
 * keys types
 */
export type KeysSearchParams = {
  version: string;
};
export type KeysOK = {
  rooms: RoomIdToRoomKeyBackup;
};

/**
 * putKeys types
 */
export type PutKeysSearchParams = {
  version: string;
};
export type PutKeysBody = {
  rooms: RoomIdToRoomKeyBackup;
};
export type PutKeysOK = {
  count: number;
  etag: string;
};

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

/**
 * keysRoomId types
 */
export type KeysRoomIdPathParams = {
  roomId: string;
};
export type KeysRoomIdSearchParams = {
  version: string;
};
export type KeysRoomIdOK = RoomKeyBackup;

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
/**
 * keysRoomIdSessionId types
 */
export type KeysRoomIdSessionIdPathParams = {
  roomId: string;
  sessionId: string;
};
export type KeysRoomIdSessionIdSearchParams = {
  version: string;
};
export type KeysRoomIdSessionIdOK = KeyBackupData;

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
