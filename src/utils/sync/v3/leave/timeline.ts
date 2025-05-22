import { LeaveRoom } from "../../../../api/matrix/client/v3/sync";
import { ClientEventWithoutRoomId } from "../../../../api/types";

export const roomTimeline = (
  leaveRoom: LeaveRoom,
): ClientEventWithoutRoomId[] => leaveRoom.timeline?.events ?? [];
