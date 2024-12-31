import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getAccountData types
 */
export type GetAccountDataPathParams = {
  userId: string;
  type: string;
};

export type GetAccountDataOK<Content extends object> = Content;
export type GetAccountDataEndpoint = MatrixEndpoint<{
  pathParams: GetAccountDataPathParams;
}>;

/**
 * putAccountData types
 */
export type PutAccountDataPathParams = {
  userId: string;
  type: string;
};

export type PutAccountDataBody = object;

export type PutAccountDataOK = Record<string, never>;
export type PutAccountDataEndpoint = MatrixEndpoint<{
  pathParams: PutAccountDataPathParams;
  body: PutAccountDataBody;
}>;
