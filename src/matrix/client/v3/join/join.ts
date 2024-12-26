import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  PostJoinBody,
  PostJoinPathParams,
  PostJoinSearchParams,
} from "./join.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3joinroomidoralias
 */
export const postJoin = (
  pathParams: PostJoinPathParams,
  searchParams?: PostJoinSearchParams,
  body?: PostJoinBody,
): MatrixRequestStruct => {
  const path = withSearchParams(
    `/_matrix/client/v3/join/${encodeURIComponent(pathParams.roomIdOrAlias)}`,
    searchParams,
  );

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
