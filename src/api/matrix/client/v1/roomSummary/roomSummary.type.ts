import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { RoomMembership } from "../../../../types";

/**
 * getRoomSummary types
 */
export type GetRoomSummaryPathParams = {
  roomIdOrAlias: string;
};
export type GetRoomSummarySearchParams = {
  via?: string[];
};

export type GetRoomSummaryOK = {
  allowed_room_ids?: string[];
  avatar_url?: string;
  canonical_alias?: string;
  encryption?: string;
  guest_can_join: boolean;
  join_rule?: string;
  membership?: RoomMembership;
  name?: string;
  num_joined_members: number;
  room_id: string;
  room_type?: string;
  room_version?: string;
  topic?: string;
  world_readable: boolean;
};

export type GetRoomSummaryEndpoint = MatrixEndpoint<{
  pathParams: GetRoomSummaryPathParams;
  searchParams?: GetRoomSummarySearchParams;
}>;
