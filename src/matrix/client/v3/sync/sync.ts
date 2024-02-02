import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { SyncSearchParams } from "./sync.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3sync
 */
export const sync = (searchParams?: SyncSearchParams): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams("/_matrix/client/v3/sync", sParams.toString());

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
