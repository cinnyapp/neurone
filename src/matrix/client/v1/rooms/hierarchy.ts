import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { HierarchyPathParams, HierarchySearchParams } from "./hierarchy.type";

export const hierarchy = (
  pathParams: HierarchyPathParams,
  searchParams?: HierarchySearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/hierarchy`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
