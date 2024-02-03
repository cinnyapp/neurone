import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostBanPathParams, PostBanBody } from "./ban.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidban
 */
export const postBan = (
  pathParams: PostBanPathParams,
  body: PostBanBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/ban`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
