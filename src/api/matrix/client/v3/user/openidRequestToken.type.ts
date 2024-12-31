import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { OpenIdCredentials } from "../../../../types";

/**
 * postOpenidRequestToken types
 */
export type PostOpenidRequestTokenPathParams = {
  userId: string;
};

export type PostOpenidRequestTokenOK = OpenIdCredentials;
export type PostOpenidRequestTokenEndpoint = MatrixEndpoint<{
  pathParams: PostOpenidRequestTokenPathParams;
}>;
