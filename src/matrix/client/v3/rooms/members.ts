import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import { MembersPathParams, MembersSearchParams } from "./members.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3roomsroomidmembers
 */
export const members = (
  pathParams: MembersPathParams,
  searchParams?: MembersSearchParams,
): MatrixRequestStruct => {
  const sParams = new URLSearchParams(searchParams);
  const path = withSearchParams(
    `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/members`,
    sParams.toString(),
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
