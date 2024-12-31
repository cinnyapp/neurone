import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { SearchCategories, SearchResultCategories } from "../../../../types";

/**
 * postSearch types
 */
export type PostSearchSearchParams = {
  next_batch?: string;
};
export type PostSearchBody = {
  search_categories: SearchCategories;
};
export type PostSearchOK = {
  search_categories: SearchResultCategories;
};
export type PostSearchEndpoint = MatrixEndpoint<{
  searchParams?: PostSearchSearchParams;
  body: PostSearchBody;
}>;
