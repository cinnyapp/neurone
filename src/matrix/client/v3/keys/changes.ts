import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { ChangesSearchParams } from "./changes.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3keyschanges
 */
export const changes = (
  searchParams: ChangesSearchParams,
): MatrixRequestStruct => {
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
