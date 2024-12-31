import { withSearchParams } from "../../../../utils/withSearchParams";
import { GetTimestampToEventEndpoint } from "./timestampToEvent.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidtimestamp_to_event
 */
export const getTimestampToEvent: GetTimestampToEventEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/timestamp_to_event`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
