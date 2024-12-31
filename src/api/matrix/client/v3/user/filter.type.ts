import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { Filter } from "../../../../types";

/**
 * postFilter types
 */
export type PostFilterPathParams = {
  userId: string;
};

export type PostFilterBody = Filter;

export type PostFilterOK = {
  filter_id: string;
};
export type PostFilterEndpoint = MatrixEndpoint<{
  pathParams: PostFilterPathParams;
  body: PostFilterBody;
}>;

/**
 * getFilter types
 */
export type GetFilterPathParams = {
  userId: string;
  filterId: string;
};

export type GetFilterOK = Filter;
export type GetFilterEndpoint = MatrixEndpoint<{
  pathParams: GetFilterPathParams;
}>;
