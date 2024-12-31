import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postGetToken types
 */
export type PostGetTokenBody = {
  auth?: object;
};
export type PostGetTokenOK = {
  expires_in_ms: number;
  login_token: string;
};
export type PostGetTokenEndpoint = MatrixEndpoint<{
  body: PostGetTokenBody;
}>;
