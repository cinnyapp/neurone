import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  RelationsPathParams,
  RelationsSearchParams,
  RelationsRelTypePathParams,
  RelationsRelTypeSearchParams,
  RelationsRelTypeEventTypePathParams,
  RelationsRelTypeEventTypeSearchParams,
} from "./relations.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidrelationseventid
 */
export const relations = (
  pathParams: RelationsPathParams,
  searchParams?: RelationsSearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/relations/${encodeURIComponent(pathParams.eventId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidrelationseventidreltype
 */
export const relationsRelType = (
  pathParams: RelationsRelTypePathParams,
  searchParams?: RelationsRelTypeSearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/relations/${encodeURIComponent(pathParams.eventId)}/${encodeURIComponent(pathParams.relType)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidrelationseventidreltypeeventtype
 */
export const relationsRelTypeEventType = (
  pathParams: RelationsRelTypeEventTypePathParams,
  searchParams?: RelationsRelTypeEventTypeSearchParams,
): MatrixRequestStruct => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/relations/${encodeURIComponent(pathParams.eventId)}/${encodeURIComponent(pathParams.relType)}/${encodeURIComponent(pathParams.eventType)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
