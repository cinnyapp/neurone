import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postUnban types
 */
export type PostUnbanPathParams = {
  roomId: string;
};
export type PostUnbanBody = {
  reason?: string;
  user_id: string;
};
export type PostUnbanOK = Record<string, never>;
export type PostUnbanEndpoint = MatrixEndpoint<{
  pathParams: PostUnbanPathParams;
  body: PostUnbanBody;
}>;
