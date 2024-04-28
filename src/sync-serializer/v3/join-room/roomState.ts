import { StateEvent } from "../../../matrix/client/v3/rooms/state.type";
import {
  StateEventWithoutRoomId,
  JoinedRoom,
} from "../../../matrix/client/v3/sync/sync.type";

export const serializeWithoutRoomIdStateEvent = (
  roomId: string,
  stateEvent: StateEventWithoutRoomId,
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
    stateEventWithoutRoomId: StateEventWithoutRoomId,
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
