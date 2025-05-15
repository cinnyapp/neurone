import { withSearchParams } from "../../../../utils";
import { GetNotificationEndpoint } from "./notifications.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3notifications
 */
export const getNotifications: GetNotificationEndpoint = ({ searchParams }) => {
  const path = withSearchParams(
    "/_matrix/client/v3/notifications",
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
