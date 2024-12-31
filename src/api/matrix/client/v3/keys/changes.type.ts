import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getChanges type
 */
export type GetChangesSearchParams = {
  from: string;
  to: string;
};
export type GetChangesOK = {
  changed: string[];
  left: string[];
};
export type GetChangesEndpoint = MatrixEndpoint<{
  searchParams: GetChangesSearchParams;
}>;
