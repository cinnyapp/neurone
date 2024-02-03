import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  PostInvite1Body,
  PostInviteBody,
  PostInvitePathParams,
} from "./invite.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidinvite
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidinvite-1
 */
export const postInvite = (
  pathParams: PostInvitePathParams,
  body: PostInviteBody | PostInvite1Body,
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
