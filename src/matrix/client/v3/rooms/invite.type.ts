/**
 * postInvite types
 */
export type PostInvitePathParams = {
  roomId: string;
};
export type PostInviteBody = {
  reason?: string;
  user_id: string;
};
export type PostInviteOK = Record<string, never>;
