import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostEmailRegisterTokenBody } from "./email.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3registeremailrequesttoken
 */
export const postEmailRequestToken = (
  body: PostEmailRegisterTokenBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/register/email/requestToken";

  return {
    method: "POST",
    path,
    body: JSON.stringify(body),
  };
};
