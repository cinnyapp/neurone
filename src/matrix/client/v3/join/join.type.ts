import { ThirdPartySigned } from "../rooms/join.type";

/**
 * postJoin types
 */
export type PostJoinPathParams = {
  roomIdOrAlias: string;
};
export type PostJoinSearchParams = {
  server_name: string;
};
export type PostJoinBody = {
  reason?: string;
  third_party_signed?: ThirdPartySigned;
};
export type PostJoinOK = {
  room_id: string;
};
