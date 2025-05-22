import { JoinRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import { StateEventWithoutRoomId } from "../../../../api/types";

export const roomState = (joinRoom: JoinRoom): StateEventWithoutRoomId[] => {
  const stateEvents = joinRoom.state?.events;
  const timelineEvents = joinRoom.timeline?.events;
  const collection: StateEventWithoutRoomId[] = [];

  stateEvents?.forEach((event) => collection.push(event));

  timelineEvents?.forEach((timelineEventWithoutRoomId) => {
    if ("state_key" in timelineEventWithoutRoomId) {
      collection.push(timelineEventWithoutRoomId);
    }
  });

  return collection;
};
