import { JoinRoom } from "../../../../api/matrix/client/v3/sync";
import { ClientEventWithoutRoomId } from "../../../../api/types";

export const roomTimeline = (joinRoom: JoinRoom): ClientEventWithoutRoomId[] =>
  joinRoom.timeline?.events ?? [];
