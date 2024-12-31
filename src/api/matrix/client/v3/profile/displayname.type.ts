import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getDisplayname types
 */
export type GetDisplaynamePathParams = {
  userId: string;
};
export type GetDisplaynameOK = {
  displayname: string;
};
export type GetDisplaynameEndpoint = MatrixEndpoint<{
  pathParams: GetDisplaynamePathParams;
}>;

/**
 * putDisplayname types
 */
export type PutDisplaynamePathParams = {
  userId: string;
};
export type PutDisplaynameBody = {
  displayname: string;
};
export type PutDisplaynameEndpoint = MatrixEndpoint<{
  pathParams: PutDisplaynamePathParams;
  body: PutDisplaynameBody;
}>;
