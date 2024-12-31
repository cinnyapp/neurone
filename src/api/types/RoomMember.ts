export type RoomMember = {
  avatar_url?: string;
  display_name?: string;
};

export type RoomMembership = "join" | "invite" | "knock" | "leave" | "ban";
