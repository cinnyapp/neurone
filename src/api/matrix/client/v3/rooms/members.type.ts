import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { RoomMembership, StateEvent } from "../../../../types";

/**
 * getMembers types
 */
export type GetMembersPathParams = {
  roomId: string;
};
export type GetMembersSearchParams = {
  at?: string;
  membership?: RoomMembership;
  not_membership?: RoomMembership;
};
export type GetMembersOK = {
  chunk: StateEvent[];
};
export type GetMembersEndpoint = MatrixEndpoint<{
  pathParams: GetMembersPathParams;
  searchParams?: GetMembersSearchParams;
}>;
