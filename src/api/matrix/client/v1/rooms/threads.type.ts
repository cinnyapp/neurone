import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ClientEvent } from "../../../../types";

/**
 * getThreads types
 */
export type GetThreadsPathParams = {
  roomId: string;
};
export type GetThreadsSearchParams = {
  from?: string;
  include?: "all" | "participated";
  limit?: number;
};
export type GetThreadsOK = {
  chunk: ClientEvent[];
  next_batch: string;
};
export type GetThreadsEndpoint = MatrixEndpoint<{
  pathParams: GetThreadsPathParams;
  searchParams?: GetThreadsSearchParams;
}>;
