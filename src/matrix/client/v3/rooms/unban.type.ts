/**
 * postUnban types
 */
export type PostUnbanPathParams = {
  roomId: string;
};
export type PostUnbanBody = {
  reason?: string;
  user_id: string;
};
export type PostUnbanOK = Record<string, never>;
