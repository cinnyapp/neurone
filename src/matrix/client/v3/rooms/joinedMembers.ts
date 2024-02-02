import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { JoinedMembersPathParams } from "./joinedMembers.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidjoined_members
 */
export const joinedMembers = (
  pathParams: JoinedMembersPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/joined_members`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
