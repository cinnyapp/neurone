import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { HierarchyPathParams, HierarchySearchParams } from "./hierarchy.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidhierarchy
 */
export const hierarchy = (
  pathParams: HierarchyPathParams,
  searchParams?: HierarchySearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/hierarchy`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
