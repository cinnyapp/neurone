import { StrippedStateEvent } from "./StrippedStateEvent";

export type StrippedChildStateEvent = StrippedStateEvent & {
  origin_server_ts: number;
};

export type SpaceHierarchyRoomChunk = {
  avatar_url?: string;
  canonical_alias?: string;
  children_state: StrippedChildStateEvent;
  guest_can_join: boolean;
  join_rule?: string;
  name?: string;
  num_joined_members: number;
  room_id: string;
  room_type?: string;
  topic?: string;
  world_readable: boolean;
};
