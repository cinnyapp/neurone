import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  StateEventPathParams,
  StatePathParams,
  PutStateEventPathParams,
} from "./state.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidstate
 */
export const state = (pathParams: StatePathParams): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/state`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidstateeventtypestatekey
 */
export const stateEvent = (
  pathParams: StateEventPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/state/${encodeURIComponent(pathParams.eventType)}/${encodeURIComponent(pathParams.stateKey)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidstateeventtypestatekey
 */
export const putStateEvent = (
  pathParams: PutStateEventPathParams,
  body: object,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/state/${encodeURIComponent(pathParams.eventType)}/${encodeURIComponent(pathParams.stateKey)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
