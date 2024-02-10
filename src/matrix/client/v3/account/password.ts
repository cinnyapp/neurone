import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  PostPasswordBody,
  PostPasswordEmailRequestTokenBody,
  PostPasswordMsisdnRequestTokenBody,
} from "./password.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3accountpassword
 */
export const postPassword = (body: PostPasswordBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/password";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3accountpasswordemailrequesttoken
 */
export const postPasswordEmailRequestToken = (
  body: PostPasswordEmailRequestTokenBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/password/email/requestToken";

  return {
    method: "POST",
    path,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3accountpasswordmsisdnrequesttoken
 */
export const postPasswordMsisdnRequestToken = (
  body: PostPasswordMsisdnRequestTokenBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/password/msisdn/requestToken";

  return {
    method: "POST",
    path,
    body: JSON.stringify(body),
  };
};
