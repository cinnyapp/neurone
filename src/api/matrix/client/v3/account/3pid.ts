import {
  Get3pidEndpoint,
  Post3pidAddEndpoint,
  Post3pidBindEndpoint,
  Post3pidDeleteEndpoint,
  Post3pidEmailRequestTokenEndpoint,
  Post3pidMsisdnRequestTokenEndpoint,
  Post3pidUnbindEndpoint,
} from "./3pid.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3account3pid
 */
export const get3pid: Get3pidEndpoint = () => {
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
export const post3pidAdd: Post3pidAddEndpoint = ({ body }) => {
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
export const post3pidBind: Post3pidBindEndpoint = ({ body }) => {
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
export const post3pidDelete: Post3pidDeleteEndpoint = ({ body }) => {
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
export const post3pidEmailRequestToken: Post3pidEmailRequestTokenEndpoint = ({
  body,
}) => {
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
export const post3pidMsisdnRequestToken: Post3pidMsisdnRequestTokenEndpoint = ({
  body,
}) => {
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
export const post3pidUnbind: Post3pidUnbindEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/account/3pid/unbind";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
