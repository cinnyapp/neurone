import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  UserProtocolPathParams,
  UserProtocolSearchParams,
  UserSearchParams,
} from "./user.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3thirdpartyuser
 */
export const user = (searchParams: UserSearchParams): MatrixRequestStruct => {
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
export const userProtocol = (
  pathParams: UserProtocolPathParams,
  searchParams?: UserProtocolSearchParams,
): MatrixRequestStruct => {
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
