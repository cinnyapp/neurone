import { MatrixEndpoint } from "../../../../MatrixEndpoint";

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
export type PostBanEndpoint = MatrixEndpoint<{
  pathParams: PostBanPathParams;
  body: PostBanBody;
}>;
