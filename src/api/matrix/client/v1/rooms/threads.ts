import { withSearchParams } from "../../../../utils/withSearchParams";
import { GetThreadsEndpoint } from "./threads.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidthreads
 */
export const getThreads: GetThreadsEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/threads`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
