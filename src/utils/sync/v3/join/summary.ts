import { RoomSummary } from "../../../../api/types";
import { JoinedRoom } from "../../../../api/matrix/client/v3/sync";

export const roomSummary = (joinedRoom: JoinedRoom): RoomSummary | undefined =>
  joinedRoom.summary ?? undefined;
