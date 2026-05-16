import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { SpaceHierarchyRoomChunk } from "../../../../types";

/**
 * getHierarchy types
 */
export type GetHierarchyPathParams = {
  roomId: string;
};
export type GetHierarchySearchParams = {
  from?: string;
  limit?: number;
  max_depth?: number;
  suggested_only?: boolean;
};

export type GetHierarchyOK = {
  next_batch?: string;
  rooms: SpaceHierarchyRoomChunk[];
};
export type GetHierarchyEndpoint = MatrixEndpoint<{
  pathParams: GetHierarchyPathParams;
  searchParams?: GetHierarchySearchParams;
}>;
