import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { RoomMember } from "../../../../types";

/**
 * getJoinedMembers types
 */
export type GetJoinedMembersPathParams = {
  roomId: string;
};

export type GetJoinedMembersOK = {
  joined: Record<string, RoomMember>;
};
export type GetJoinedMembersEndpoint = MatrixEndpoint<{
  pathParams: GetJoinedMembersPathParams;
}>;
