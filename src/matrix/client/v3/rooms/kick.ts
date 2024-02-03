import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostKickPathParams, PostKickBody } from "./kick.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidkick
 */
export const postKick = (
  pathParams: PostKickPathParams,
  body: PostKickBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/kick`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
