import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  AvatarUrlPathParams,
  PutAvatarUrlBody,
  PutAvatarUrlPathParams,
} from "./avatarUrl.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3profileuseridavatar_url
 */
export const avatarUrl = (
  pathParams: AvatarUrlPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/profile/${encodeURIComponent(pathParams.userId)}/avatar_url`;

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3profileuseridavatar_url
 */
export const putAvatarUrl = (
  pathParams: PutAvatarUrlPathParams,
  body: PutAvatarUrlBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/profile/${encodeURIComponent(pathParams.userId)}/avatar_url`;

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
