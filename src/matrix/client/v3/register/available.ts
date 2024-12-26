import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { AvailableSearchParams } from "./available.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3registeravailable
 */
export const available = (
  searchParams: AvailableSearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams(
    "/_matrix/client/v3/register/available",
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
  };
};
