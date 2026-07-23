import { PostUpgradeEndpoint } from "./upgrade.type";

/**
 * https://spec.matrix.org/v1.16/client-server-api/#post_matrixclientv3roomsroomidupgrade
 */
export const postUpgrade: PostUpgradeEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/upgrade`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
