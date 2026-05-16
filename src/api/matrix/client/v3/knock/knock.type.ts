import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postKnock types
 */
export type PostKnockPathParams = {
  roomIdOrAlias: string;
};
export type PostKnockSearchParams = {
  /**
   * @deprecated In spec version v1.14 - Use `via` param instead
   */
  server_name?: string[];
  via?: string[];
};
export type PostKnockBody = {
  reason?: string;
};
export type PostKnockOK = {
  room_id: string;
};
export type PostKnockEndpoint = MatrixEndpoint<{
  pathParams: PostKnockPathParams;
  searchParams?: PostKnockSearchParams;
  body?: PostKnockBody;
}>;
