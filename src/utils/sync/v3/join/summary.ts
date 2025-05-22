import { RoomSummary } from "../../../../api/types";
import { JoinRoom } from "../../../../api/matrix/client/v3/sync";

export const roomSummary = (joinRoom: JoinRoom): RoomSummary | undefined =>
  joinRoom.summary ?? undefined;
