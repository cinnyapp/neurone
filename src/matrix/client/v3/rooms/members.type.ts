import { StateEvent } from "./state.type";

export type Membership = "join" | "invite" | "knock" | "leave" | "ban";

/**
 * members types
 */
export type MembersPathParams = {
  roomId: string;
};
export type MembersSearchParams = {
  at?: string;
  membership?: Membership;
  not_membership?: Membership;
};
export type MembersOK<RoomMemberEvent extends StateEvent> = {
  chunk: RoomMemberEvent[];
};
