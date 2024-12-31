import { withSearchParams } from "../../../../utils/withSearchParams";
import { PostRegisterEndpoint } from "./register.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3register
 */
export const postRegister: PostRegisterEndpoint = ({ searchParams, body }) => {
  const path = withSearchParams("/_matrix/client/v3/register", searchParams);

  return {
    method: "POST",
    path,
    rateLimited: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
