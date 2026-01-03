import { PostReportEndpoint } from "./report.type";

/**
 * https://spec.matrix.org/v1.14/client-server-api/#post_matrixclientv3usersuseridreport
 */
export const postReport: PostReportEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/users/${encodeURIComponent(pathParams.userId)}/report`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body ?? {}),
  };
};
