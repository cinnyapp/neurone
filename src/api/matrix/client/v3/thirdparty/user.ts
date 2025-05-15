import { withSearchParams } from "../../../../utils";
import { GetUserEndpoint, GetUserProtocolEndpoint } from "./user.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3thirdpartyuser
 */
export const getUser: GetUserEndpoint = ({ searchParams }) => {
  const path = withSearchParams(
    "/_matrix/client/v3/thirdparty/user",
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3thirdpartyuserprotocol
 */
export const getUserProtocol: GetUserProtocolEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/thirdparty/user/${encodeURIComponent(pathParams.protocol)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
