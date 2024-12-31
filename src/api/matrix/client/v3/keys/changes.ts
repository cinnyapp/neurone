import { withSearchParams } from "../../../../utils/withSearchParams";
import { GetChangesEndpoint } from "./changes.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3keyschanges
 */
export const getChanges: GetChangesEndpoint = ({ searchParams }) => {
  const path = withSearchParams(
    "/_matrix/client/v3/keys/changes",
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
