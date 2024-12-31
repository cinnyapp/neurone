import {
  DeleteVersionVersionEndpoint,
  GetVersionEndpoint,
  GetVersionVersionEndpoint,
  PostVersionEndpoint,
  PutVersionVersionEndpoint,
} from "./version.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keysversion
 */
export const getVersion: GetVersionEndpoint = () => {
  const path = "/_matrix/client/v3/room_keys/version";

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3room_keysversion
 */
export const postVersion: PostVersionEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/room_keys/version";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keysversionversion
 */
export const getVersionVersion: GetVersionVersionEndpoint = ({
  pathParams,
}) => {
  const path = `/_matrix/client/v3/room_keys/version/${encodeURIComponent(pathParams.version)}`;

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3room_keysversionversion
 */
export const putVersionVersion: PutVersionVersionEndpoint = ({
  pathParams,
  body,
}) => {
  const path = `/_matrix/client/v3/room_keys/version/${encodeURIComponent(pathParams.version)}`;

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3room_keysversionversion
 */
export const deleteVersionVersion: DeleteVersionVersionEndpoint = ({
  pathParams,
}) => {
  const path = `/_matrix/client/v3/room_keys/version/${encodeURIComponent(pathParams.version)}`;

  return {
    method: "DELETE",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
