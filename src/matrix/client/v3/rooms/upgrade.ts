import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PostUpgradeBody, PostUpgradePathParams } from "./upgrade.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidupgrade
 */
export const postUpgrade = (
  pathParams: PostUpgradePathParams,
  body: PostUpgradeBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/upgrade`;

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
