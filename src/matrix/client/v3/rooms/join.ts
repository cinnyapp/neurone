import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostJoinBody, PostJoinPathParams } from "./join.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidjoin
 */
export const postJoin = (
  pathParams: PostJoinPathParams,
  body: PostJoinBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/join`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
