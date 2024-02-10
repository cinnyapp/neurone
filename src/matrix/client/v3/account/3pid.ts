import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  Post3pidAddBody,
  Post3pidBindBody,
  Post3pidDeleteBody,
  Post3pidEmailRequestTokenBody,
  Post3pidMsisdnRequestTokenBody,
  Post3pidUnbindBody,
} from "./3pid.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3account3pid
 */
export const _3pid = (): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/3pid";

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidadd
 */
export const post3pidAdd = (body: Post3pidAddBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/3pid/add";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidbind
 */
export const post3pidBind = (body: Post3pidBindBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/3pid/bind";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3piddelete
 */
export const post3pidDelete = (
  body: Post3pidDeleteBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/3pid/delete";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidemailrequesttoken
 */
export const post3pidEmailRequestToken = (
  body: Post3pidEmailRequestTokenBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/3pid/email/requestToken";

  return {
    method: "POST",
    path,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidmsisdnrequesttoken
 */
export const post3pidMsisdnRequestToken = (
  body: Post3pidMsisdnRequestTokenBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/3pid/msisdn/requestToken";

  return {
    method: "POST",
    path,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidunbind
 */
export const post3pidUnbind = (
  body: Post3pidUnbindBody,
): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/account/3pid/unbind";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
