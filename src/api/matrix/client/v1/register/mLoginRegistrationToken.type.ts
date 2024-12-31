import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getMLoginRegistrationTokenValidity types
 */
export type GetMLoginRegistrationTokenValiditySearchParams = {
  token: string;
};
export type GetMLoginRegistrationTokenValidityOK = {
  valid: boolean;
};
export type GetMLoginRegistrationTokenValidityEndpoint = MatrixEndpoint<{
  searchParams: GetMLoginRegistrationTokenValiditySearchParams;
}>;
