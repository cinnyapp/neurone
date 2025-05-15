import { withSearchParams } from "../../../../utils";
import { GetSyncEndpoint } from "./sync.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3sync
 */
export const getSync: GetSyncEndpoint = ({ searchParams }) => {
  const path = withSearchParams("/_matrix/client/v3/sync", searchParams);

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
