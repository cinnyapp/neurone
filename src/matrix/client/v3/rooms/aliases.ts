import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { AliasesPathParams } from "./aliases.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidaliases
 */
export const aliases = (pathParams: AliasesPathParams): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/aliases`;

  return {
    method: "GET",
    path,
    rateLimited: true,
    requireAuthentication: true,
  };
};
