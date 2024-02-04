export type Invite3PID = {
  address: string;
  id_access_token: string;
  id_server: string;
  medium: string;
};

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
export type PostInvite1Body = Invite3PID;
export type PostInviteOK = Record<string, never>;
