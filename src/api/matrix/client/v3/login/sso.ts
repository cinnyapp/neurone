import { withSearchParams } from "../../../../utils";
import {
  GetSSORedirectEndpoint,
  GetSSORedirectIdpIdEndpoint,
} from "./sso.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3loginssoredirect
 */
export const getSSORedirect: GetSSORedirectEndpoint = ({ searchParams }) => {
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
export const getSSORedirectIdpId: GetSSORedirectIdpIdEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/login/sso/redirect/${encodeURIComponent(pathParams.idpId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
  };
};
