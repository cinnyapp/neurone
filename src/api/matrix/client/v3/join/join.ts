import { withSearchParams } from "../../../../utils";
import { PostJoinEndpoint } from "./join.type";

/**
 * https://spec.matrix.org/v1.12/client-server-api/#post_matrixclientv3joinroomidoralias
 */
export const postJoin: PostJoinEndpoint = ({
  pathParams,
  searchParams,
  body,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/join/${encodeURIComponent(pathParams.roomIdOrAlias)}`,
    searchParams,
  );

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body ?? {}),
  };
};
