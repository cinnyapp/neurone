import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getSSORedirect types
 */
export type GetSSORedirectSearchParams = {
  redirectUrl: string;
};
export type GetSSORedirectEndpoint = MatrixEndpoint<{
  searchParams: GetSSORedirectSearchParams;
}>;

/**
 * getSSORedirectIdpId types
 */
export type GetSSORedirectIdpIdPathParams = {
  idpId: string;
};
export type GetSSORedirectIdpIdSearchParams = {
  redirectUrl: string;
};
export type GetSSORedirectIdpIdEndpoint = MatrixEndpoint<{
  pathParams: GetSSORedirectIdpIdPathParams;
  searchParams: GetSSORedirectIdpIdSearchParams;
}>;
