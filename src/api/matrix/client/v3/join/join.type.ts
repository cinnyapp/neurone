import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ThirdPartySigned } from "../../../../types";

/**
 * postJoin types
 */
export type PostJoinPathParams = {
  roomIdOrAlias: string;
};
export type PostJoinSearchParams = {
  /**
   * @deprecated In spec version v1.14 - Use `via` param instead
   */
  server_name?: string[];
  via?: string[];
};
export type PostJoinBody = {
  reason?: string;
  third_party_signed?: ThirdPartySigned;
};
export type PostJoinOK = {
  room_id: string;
};
export type PostJoinEndpoint = MatrixEndpoint<{
  pathParams: PostJoinPathParams;
  searchParams?: PostJoinSearchParams;
  body?: PostJoinBody;
}>;
