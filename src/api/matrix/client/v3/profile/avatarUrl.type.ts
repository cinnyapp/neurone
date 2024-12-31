import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getAvatarUrl types
 */
export type GetAvatarUrlPathParams = {
  userId: string;
};
export type GetAvatarUrlOK = {
  avatar_url: string;
};
export type GetAvatarUrlEndpoint = MatrixEndpoint<{
  pathParams: GetAvatarUrlPathParams;
}>;

/**
 * putAvatarUrl types
 */
export type PutAvatarUrlPathParams = {
  userId: string;
};
export type PutAvatarUrlBody = {
  avatar_url: string;
};
export type PutAvatarUrlEndpoint = MatrixEndpoint<{
  pathParams: PutAvatarUrlPathParams;
  body: PutAvatarUrlBody;
}>;
