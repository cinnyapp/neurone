import { withSearchParams } from "../../../../utils";
import { GetContextEndpoint } from "./context.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidcontexteventid
 */
export const getContext: GetContextEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/context/${encodeURIComponent(pathParams.eventId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
