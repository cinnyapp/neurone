import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  SSORedirectIdpIdPathParams,
  SSORedirectIdpIdSearchParams,
  SSORedirectSearchParams,
} from "./sso.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3loginssoredirect
 */
export const ssoRedirect = (
  searchParams: SSORedirectSearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams(
    "/_matrix/client/v3/login/sso/redirect",
    searchParams,
  );

  return {
    method: "GET",
    path,
  };
};
/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3loginssoredirectidpid
 */
export const ssoRedirectIdpId = (
  pathParams: SSORedirectIdpIdPathParams,
  searchParams: SSORedirectIdpIdSearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams(
    `/_matrix/client/v3/login/sso/redirect/${encodeURIComponent(pathParams.idpId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
  };
};
