import { PostReportEndpoint } from "./report.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidreporteventid
 */
export const postReport: PostReportEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/report/${encodeURIComponent(pathParams.eventId)}`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
