import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  TimestampToEventPathParams,
  TimestampToEventSearchParams,
} from "./timestampToEvent.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidtimestamp_to_event
 */
export const timestampToEvent = (
  pathParams: TimestampToEventPathParams,
  searchParams: TimestampToEventSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/timestamp_to_event`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
