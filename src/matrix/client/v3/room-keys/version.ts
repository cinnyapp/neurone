import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  DeleteVersionVersionPathParams,
  PostVersionBody,
  PutVersionVersionBody,
  PutVersionVersionPathParams,
  VersionVersionPathParams,
} from "./version.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3room_keysversion
 */
export const version = (): MatrixRequestStruct => {
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
export const postVersion = (body: PostVersionBody): MatrixRequestStruct => {
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
export const versionVersion = (
  pathParams: VersionVersionPathParams,
): MatrixRequestStruct => {
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
export const putVersionVersion = (
  pathParams: PutVersionVersionPathParams,
  body: PutVersionVersionBody,
): MatrixRequestStruct => {
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
export const deleteVersionVersion = (
  pathParams: DeleteVersionVersionPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/room_keys/version/${encodeURIComponent(pathParams.version)}`;

  return {
    method: "DELETE",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
