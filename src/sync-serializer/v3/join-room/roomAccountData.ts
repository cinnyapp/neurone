import {
  AccountDataEvent,
  JoinedRoom,
} from "../../../matrix/client/v3/sync/sync.type";
import { RoomAccountDataEvent } from "./roomAccountData.type";

export const serializeRoomAccountDataEvent = (
  roomId: string,
  accountDataEvent: AccountDataEvent,
): RoomAccountDataEvent => ({
  room_id: roomId,
  ...accountDataEvent,
});

export const serializeJoinedRoomAccountData = (
  roomId: string,
  joinedRoom: JoinedRoom,
): RoomAccountDataEvent[] => {
  const collection: RoomAccountDataEvent[] =
    joinedRoom.account_data?.events?.map((accountDataEvent) =>
      serializeRoomAccountDataEvent(roomId, accountDataEvent),
    ) ?? [];
  return collection;
};
