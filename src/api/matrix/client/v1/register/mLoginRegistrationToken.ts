import { withSearchParams } from "../../../../utils/withSearchParams";
import { GetMLoginRegistrationTokenValidityEndpoint } from "./mLoginRegistrationToken.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1registermloginregistration_tokenvalidity
 */
export const getMLoginRegistrationTokenValidity: GetMLoginRegistrationTokenValidityEndpoint =
  ({ searchParams }) => {
    const path = withSearchParams(
      "/_matrix/client/v1/register/m.login.registration_token/validity",
      searchParams,
    );

    return {
      method: "GET",
      path,
      rateLimited: true,
    };
  };
