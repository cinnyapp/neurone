import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostUnbanPathParams, PostUnbanBody } from "./unban.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidunban
 */
export const postUnban = (
  pathParams: PostUnbanPathParams,
  body: PostUnbanBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/unban`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
