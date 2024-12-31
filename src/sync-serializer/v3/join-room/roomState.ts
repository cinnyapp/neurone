import { JoinedRoom } from "../../../api/matrix/client/v3/sync/sync.type";
import { StateEvent } from "../../../api/types";

export const serializeWithoutRoomIdStateEvent = (
  roomId: string,
  stateEvent: Omit<StateEvent, "room_id">,
): StateEvent => ({
  room_id: roomId,
  ...stateEvent,
});

export const serializeRoomState = (
  roomId: string,
  joinedRoom: JoinedRoom,
): StateEvent[] => {
  const stateEvents = joinedRoom.state?.events;
  const timelineEvents = joinedRoom.timeline?.events;
  const collection: StateEvent[] = [];

  const serializeAndPush = (
    stateEventWithoutRoomId: Omit<StateEvent, "room_id">,
  ) => {
    collection.push(
      serializeWithoutRoomIdStateEvent(roomId, stateEventWithoutRoomId),
    );
  };

  stateEvents?.forEach(serializeAndPush);

  timelineEvents?.forEach((timelineEventWithoutRoomId) => {
    if ("state_key" in timelineEventWithoutRoomId) {
      serializeAndPush(timelineEventWithoutRoomId);
    }
  });

  return collection;
};
