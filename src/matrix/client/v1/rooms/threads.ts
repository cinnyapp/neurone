import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { ThreadsPathParams, ThreadsSearchParams } from "./threads.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidthreads
 */
export const threads = (
  pathParams: ThreadsPathParams,
  searchParams?: ThreadsSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/threads`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
