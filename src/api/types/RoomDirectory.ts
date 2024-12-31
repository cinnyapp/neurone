export type DirectoryRoomVisibility = "public" | "private";

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
