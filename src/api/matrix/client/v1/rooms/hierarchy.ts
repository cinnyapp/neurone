import { withSearchParams } from "../../../../utils";
import { GetHierarchyEndpoint } from "./hierarchy.type";

/**
 * https://spec.matrix.org/v1.15/client-server-api/#get_matrixclientv1roomsroomidhierarchy
 */
export const getHierarchy: GetHierarchyEndpoint = ({
  pathParams,
  searchParams,
}) => {
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
