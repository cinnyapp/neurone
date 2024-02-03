export type ThirdPartySigned = {
  mxid: string;
  sender: string;
  signatures: object;
  token: string;
};

/**
 * postJoin types
 */
export type PostJoinPathParams = {
  roomId: string;
};
export type PostJoinBody = {
  reason?: string;
  third_party_signed?: ThirdPartySigned;
};
export type PostJoinOK = {
  room_id: string;
};
