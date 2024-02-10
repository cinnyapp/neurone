import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostMsisdnRegisterTokenBody } from "./msisdn.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3registermsisdnrequesttoken
 */
export const postMsisdnRequestToken = (
  body: PostMsisdnRegisterTokenBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/register/msisdn/requestToken";

  return {
    method: "POST",
    path,
    body: JSON.stringify(body),
  };
};
