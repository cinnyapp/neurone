import {
  GetStateEnpoint,
  GetStateEventEndpoint,
  PutStateEventEndpoint,
} from "./state.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidstate
 */
export const getState: GetStateEnpoint = ({ pathParams }) => {
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
export const getStateEvent: GetStateEventEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/state/${encodeURIComponent(pathParams.eventType)}/${encodeURIComponent(pathParams.stateKey)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3roomsroomidstateeventtypestatekey
 */
export const putStateEvent: PutStateEventEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/state/${encodeURIComponent(pathParams.eventType)}/${encodeURIComponent(pathParams.stateKey)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
