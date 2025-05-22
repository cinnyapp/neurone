import { JoinedRoom } from "../../../../api/matrix/client/v3/sync";
import { ClientEventWithoutRoomId } from "../../../../api/types";

export const roomTimeline = (
  joinedRoom: JoinedRoom,
): ClientEventWithoutRoomId[] => joinedRoom.timeline?.events ?? [];
