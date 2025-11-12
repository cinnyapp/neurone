import { PostReadMarkersEndpoint } from "./readMarkers.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidread_markers
 */
export const postReadMarkers: PostReadMarkersEndpoint = ({
  pathParams,
  body,
}) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/read_markers`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body ?? {}),
  };
};
