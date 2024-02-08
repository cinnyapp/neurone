import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  LocationProtocolPathParams,
  LocationProtocolSearchParams,
  LocationSearchParams,
} from "./location.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3thirdpartylocation
 */
export const location = (
  searchParams: LocationSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    "/_matrix/client/v3/thirdparty/location",
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3thirdpartylocationprotocol
 */
export const locationProtocol = (
  pathParams: LocationProtocolPathParams,
  searchParams?: LocationProtocolSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/thirdparty/location/${encodeURIComponent(pathParams.protocol)}`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
