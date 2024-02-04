import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { ContextPathParams, ContextSearchParams } from "./context.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidcontexteventid
 */
export const context = (
  pathParams: ContextPathParams,
  searchParams?: ContextSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/context/${encodeURIComponent(pathParams.eventId)}`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
