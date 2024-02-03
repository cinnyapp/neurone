/**
 * postBan types
 */
export type PostBanPathParams = {
  roomId: string;
};
export type PostBanBody = {
  reason?: string;
  user_id: string;
};
export type PostBanOK = Record<string, never>;
