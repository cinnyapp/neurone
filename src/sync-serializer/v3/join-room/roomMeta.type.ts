export type RoomMeta = {
  roomId: string;
  avatar?: string;
  name?: string;
  topic?: string;
  canonicalAlias?: string;
  encryption?: boolean;
  heros?: string[];
  memberCount?: number;

  joinRule?: string;
  historyVisibility?: string;
  guestAccess?: string;
};
