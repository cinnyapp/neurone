import { MatrixRequestStruct } from "../../MatrixRequestStruct";
import { withSearchParams } from "../../_utils/withSearchParams";
import {
  PostKnockBody,
  PostKnockPathParams,
  PostKnockSearchParams,
} from "./knock.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3knockroomidoralias
 */
export const postKnock = (
  pathParams: PostKnockPathParams,
  searchParams?: PostKnockSearchParams,
  body?: PostKnockBody,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/knock/${encodeURIComponent(pathParams.roomIdOrAlias)}`,
    sParams.toString(),
  );

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
