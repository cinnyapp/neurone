import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postKick types
 */
export type PostKickPathParams = {
  roomId: string;
};
export type PostKickBody = {
  reason?: string;
  user_id: string;
};
export type PostKickOK = Record<string, never>;
export type PostKickEndpoint = MatrixEndpoint<{
  pathParams: PostKickPathParams;
  body: PostKickBody;
}>;
