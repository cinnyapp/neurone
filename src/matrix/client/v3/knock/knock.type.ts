/**
 * postKnock types
 */
export type PostKnockPathParams = {
  roomIdOrAlias: string;
};
export type PostKnockSearchParams = {
  server_name?: string;
};
export type PostKnockBody = {
  reason?: string;
};
export type PostKnockOK = {
  room_id: string;
};
