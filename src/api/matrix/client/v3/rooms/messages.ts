import { withSearchParams } from "../../../../utils/withSearchParams";
import { GetMessagesEndpoint } from "./messages.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidmessages
 */
export const getMessages: GetMessagesEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/messages`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
