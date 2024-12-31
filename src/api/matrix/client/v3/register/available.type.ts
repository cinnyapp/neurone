import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getAvailable types
 */
export type GetAvailableSearchParams = {
  username: string;
};

export type GetAvailableOK = {
  available: true;
};
export type GetAvailableEndpoint = MatrixEndpoint<{
  searchParams: GetAvailableSearchParams;
}>;
