export type StrippedChildStateEvent = {
  content: object;
  origin_server_ts: number;
  sender: string;
  state_key: string;
  type: string;
};

export type ChildRoomsChunk = {
  avatar_url?: string;
  canonical_alias?: string;
  children_state: unknown;
  guest_can_join: boolean;
  join_rule?: string;
  name?: string;
  num_joined_members: number;
  room_id: string;
  room_type?: string;
  topic?: string;
  world_readable: boolean;
};

/**
 * hierarchy types
 */
export type HierarchyPathParams = {
  roomId: string;
};
export type HierarchySearchParams = {
  from?: string;
  limit?: string;
  max_depth?: string;
  suggested_only?: string;
};

export type HierarchyOK = {
  next_batch?: string;
  rooms: ChildRoomsChunk[];
};
