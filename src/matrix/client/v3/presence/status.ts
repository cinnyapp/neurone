import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  PutStatusBody,
  PutStatusPathParams,
  StatusPathParams,
} from "./status.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3presenceuseridstatus
 */
export const status = (pathParams: StatusPathParams): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/presence/${encodeURIComponent(pathParams.userId)}/status`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3presenceuseridstatus
 */
export const putStatus = (
  pathParams: PutStatusPathParams,
  body: PutStatusBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/presence/${encodeURIComponent(pathParams.userId)}/status`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
