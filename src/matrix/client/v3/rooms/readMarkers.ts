import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  PostReadMarkersBody,
  PostReadMarkersPathParams,
} from "./readMarkers.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidread_markers
 */
export const postReadMarkers = (
  pathParams: PostReadMarkersPathParams,
  body?: PostReadMarkersBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/read_markers`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
