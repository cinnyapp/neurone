import { JoinedRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import { StateEventWithoutRoomId } from "../../../../api/types";

export const roomState = (
  joinedRoom: JoinedRoom,
): StateEventWithoutRoomId[] => {
  const stateEvents = joinedRoom.state?.events;
  const timelineEvents = joinedRoom.timeline?.events;
  const collection: StateEventWithoutRoomId[] = [];

  stateEvents?.forEach((event) => collection.push(event));

  timelineEvents?.forEach((timelineEventWithoutRoomId) => {
    if ("state_key" in timelineEventWithoutRoomId) {
      collection.push(timelineEventWithoutRoomId);
    }
  });

  return collection;
};
