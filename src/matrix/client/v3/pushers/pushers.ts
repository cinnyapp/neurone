import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostPushersBody } from "./pushers.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3pushers
 */
export const pushers = (): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/pushers";

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3pushersset
 */
export const postPushersSet = (body: PostPushersBody): MatrixRequestStruct => {
  const path = "/_matrix/client/v3/pushers/set";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
