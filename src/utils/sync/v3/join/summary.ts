import { RoomSummary } from "../../../../api/types";
import { JoinRoom } from "../../../../api/matrix/client/v3/sync";

export const roomSummary = (joinRoom: JoinRoom): RoomSummary | undefined => {
  if (joinRoom.summary && Object.keys(joinRoom.summary).length > 0) {
    return joinRoom.summary;
  }

  return undefined;
};
