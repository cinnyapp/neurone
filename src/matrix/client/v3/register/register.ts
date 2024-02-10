import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { PostRegisterBody, PostRegisterSearchParams } from "./register.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3register
 */
export const postRegister = (
  searchParams?: PostRegisterSearchParams,
  body?: PostRegisterBody,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    "/_matrix/client/v3/register",
    sParams.toString(),
  );

  return {
    method: "POST",
    path,
    rateLimited: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
