import { withSearchParams } from "../../../../utils";
import { GetRoomSummaryEndpoint } from "./roomSummary.type";

/**
 * https://spec.matrix.org/v1.15/client-server-api/#get_matrixclientv1room_summaryroomidoralias
 */
export const getRoomSummary: GetRoomSummaryEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/room_summary/${encodeURIComponent(pathParams.roomIdOrAlias)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
