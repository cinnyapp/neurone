export type PublicRoomsChunk = {
  avatar_url?: string;
  canonical_alias?: string;
  guest_can_join: boolean;
  join_rule?: string;
  name?: string;
  num_joined_members: number;
  room_id: string;
  room_type?: string;
  topic?: string;
  world_readable: boolean;
};

export type PublicRoomsFilter = {
  generic_search_term?: string;
  room_types?: (string | null)[];
};

/**
 * publicRooms types
 */
export type PublicRoomsSearchParams = {
  limit?: string;
  server?: string;
  since?: string;
};
export type PublicRoomsOK = {
  chunk: PublicRoomsChunk[];
  next_batch?: string;
  prev_batch?: string;
  total_room_count_estimate?: number;
};

/**
 * postPublicRooms types
 */
export type PostPublicRoomsSearchParams = {
  server?: string;
};
export type PostPublicRoomsBody = {
  filter?: PublicRoomsFilter;
  include_all_networks?: boolean;
  limit?: number;
  since?: string;
  third_party_instance_id?: string;
};
export type PostPublicRoomsOK = {
  chunk: PublicRoomsChunk[];
  next_batch?: string;
  prev_batch?: string;
  total_room_count_estimate?: number;
};
