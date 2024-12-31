import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postForget types
 */
export type PostForgetPathParams = {
  roomId: string;
};
export type PostForgetOK = Record<string, never>;
export type PostForgetEndpoint = MatrixEndpoint<{
  pathParams: PostForgetPathParams;
}>;
