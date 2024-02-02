import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { EventPathParams } from "./event.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomideventeventid
 */
export const event = (pathParams: EventPathParams): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/event/${encodeURIComponent(pathParams.eventId)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
