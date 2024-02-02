export type RoomMember = {
  avatar_url?: string;
  display_name?: string;
};

export type UserIdToRoomMember = Record<string, RoomMember>;

/**
 * joinedMembers types
 */
export type JoinedMembersPathParams = {
  roomId: string;
};

export type JoinedMembersOK = {
  joined: UserIdToRoomMember;
};
