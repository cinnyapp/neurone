import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { NotificationsSearchParams } from "./notifications.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3notifications
 */
export const notifications = (
  searchParams?: NotificationsSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    "/_matrix/client/v3/notifications",
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
