import { LeaveRoom } from "../../../../api/matrix/client/v3/sync";
import { StateEventWithoutRoomId } from "../../../../api/types";

export const roomState = (leaveRoom: LeaveRoom): StateEventWithoutRoomId[] => {
  const stateEvents = leaveRoom.state?.events;
  const timelineEvents = leaveRoom.timeline?.events;
  const collection: StateEventWithoutRoomId[] = [];

  stateEvents?.forEach((event) => collection.push(event));

  timelineEvents?.forEach((timelineEventWithoutRoomId) => {
    if ("state_key" in timelineEventWithoutRoomId) {
      collection.push(timelineEventWithoutRoomId);
    }
  });

  return collection;
};
