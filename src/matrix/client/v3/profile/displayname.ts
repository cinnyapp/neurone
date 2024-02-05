import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  DisplaynamePathParams,
  PutDisplaynameBody,
  PutDisplaynamePathParams,
} from "./displayname.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3profileuseriddisplayname
 */
export const displayname = (
  pathParams: DisplaynamePathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/profile/${encodeURIComponent(pathParams.userId)}/displayname`;

  return {
    method: "GET",
    path,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3profileuseriddisplayname
 */
export const putDisplayname = (
  pathParams: PutDisplaynamePathParams,
  body: PutDisplaynameBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/profile/${encodeURIComponent(pathParams.userId)}/displayname`;

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
