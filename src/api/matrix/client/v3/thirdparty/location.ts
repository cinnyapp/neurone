import { withSearchParams } from "../../../../utils";
import {
  GetLocationEndpoint,
  GetLocationProtocolEndpoint,
} from "./location.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3thirdpartylocation
 */
export const getLocation: GetLocationEndpoint = ({ searchParams }) => {
  const path = withSearchParams(
    "/_matrix/client/v3/thirdparty/location",
    searchParams,
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
export const getLocationProtocol: GetLocationProtocolEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/thirdparty/location/${encodeURIComponent(pathParams.protocol)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
