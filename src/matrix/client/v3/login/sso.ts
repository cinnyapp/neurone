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
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    "/_matrix/client/v3/login/sso/redirect",
    sParams.toString(),
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
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/login/sso/redirect/${encodeURIComponent(pathParams.idpId)}`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
  };
};
