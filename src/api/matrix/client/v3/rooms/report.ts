import { PostReportEventIdEndpoint } from "./report.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidreporteventid
 */
export const postReportEventId: PostReportEventIdEndpoint = ({
  pathParams,
  body,
}) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/report/${encodeURIComponent(pathParams.eventId)}`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body ?? {}),
  };
};
