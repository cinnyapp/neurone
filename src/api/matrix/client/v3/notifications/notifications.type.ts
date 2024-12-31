import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { NotificationChunk } from "../../../../types";

/**
 * getNotifications types
 */
export type GetNotificationsSearchParams = {
  from?: string;
  limit?: string;
  only?: string;
};
export type GetNotificationsOK = {
  next_token?: string;
  notifications: NotificationChunk[];
};
export type GetNotificationEndpoint = MatrixEndpoint<{
  searchParams?: GetNotificationsSearchParams;
}>;
