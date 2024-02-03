import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostLeavePathParams, PostLeaveBody } from "./leave.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidleave
 */
export const postLeave = (
  pathParams: PostLeavePathParams,
  body?: PostLeaveBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/leave`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
