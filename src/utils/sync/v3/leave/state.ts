import { LeaveRoom } from "../../../../api/matrix/client/v3/sync";
import { StateEventWithoutRoomId } from "../../../../api/types";

export const roomState = (leaveRoom: LeaveRoom): StateEventWithoutRoomId[] =>
  leaveRoom.state?.events ?? [];
