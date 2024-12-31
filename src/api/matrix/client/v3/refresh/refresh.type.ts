import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postRefresh body
 */
export type PostRefreshBody = {
  refresh_token: string;
};
export type PostRefreshOK = {
  access_token: string;
  expires_in_ms?: number;
  refresh_token?: string;
};
export type PostRefreshEndpoint = MatrixEndpoint<{
  body: PostRefreshBody;
}>;
