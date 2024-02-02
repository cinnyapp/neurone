import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { MessagesPathParams, MessagesSearchParams } from "./messages.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidmessages
 */
export const messages = (
  pathParams: MessagesPathParams,
  searchParams: MessagesSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/messages`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
