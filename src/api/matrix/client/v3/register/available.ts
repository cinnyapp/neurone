import { withSearchParams } from "../../../../utils/withSearchParams";
import { GetAvailableEndpoint } from "./available.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3registeravailable
 */
export const getAvailable: GetAvailableEndpoint = ({ searchParams }) => {
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
