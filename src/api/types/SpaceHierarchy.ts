import { StrippedStateEvent } from "./StrippedStateEvent";

export type StrippedChildStateEvent = StrippedStateEvent & {
  origin_server_ts: number;
};

export type SpaceHierarchyRoomChunk = {
  allowed_room_ids?: string[];
  avatar_url?: string;
  canonical_alias?: string;
  children_state: StrippedChildStateEvent;
  encryption?: string;
  guest_can_join: boolean;
  join_rule?: string;
  name?: string;
  num_joined_members: number;
  room_id: string;
  room_type?: string;
  room_version?: string;
  topic?: string;
  world_readable: boolean;
};
