import { withSearchParams } from "../../../../utils/withSearchParams";
import {
  GetRelationsEndpoint,
  GetRelationsRelEndpoint,
  GetRelationsRelTypeEndpoint,
} from "./relations.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv1roomsroomidrelationseventid
 */
export const getRelations: GetRelationsEndpoint = ({
  pathParams,
  searchParams,
}) => {
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
export const getRelationsRelType: GetRelationsRelEndpoint = ({
  pathParams,
  searchParams,
}) => {
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
export const getRelationsRelTypeEventType: GetRelationsRelTypeEndpoint = ({
  pathParams,
  searchParams,
}) => {
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
