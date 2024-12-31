import { GetLoginEndpoint, PostLoginEndpoint } from "./login.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3login
 */
export const getLogin: GetLoginEndpoint = () => {
  const path = "/_matrix/client/v3/login";

  return {
    method: "GET",
    path,
    rateLimited: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3login
 */
export const postLogin: PostLoginEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/login";

  return {
    method: "POST",
    path,
    rateLimited: true,
    body: JSON.stringify(body),
  };
};
