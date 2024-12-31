import { GetAvatarUrlEndpoint, PutAvatarUrlEndpoint } from "./avatarUrl.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3profileuseridavatar_url
 */
export const getAvatarUrl: GetAvatarUrlEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/profile/${encodeURIComponent(pathParams.userId)}/avatar_url`;

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3profileuseridavatar_url
 */
export const putAvatarUrl: PutAvatarUrlEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/profile/${encodeURIComponent(pathParams.userId)}/avatar_url`;

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
