import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostInviteBody, PostInvitePathParams } from "./invite.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidinvite
 */
export const postInvite = (
  pathParams: PostInvitePathParams,
  body: PostInviteBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/invite`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
