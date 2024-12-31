import { JoinedRoom } from "../../../api/matrix/client/v3/sync/sync.type";
import { RoomThreadUnread, RoomUnread } from "./roomUnread.type";

export const serializeRoomUnread = (
  roomId: string,
  joinedRoom: JoinedRoom,
): RoomUnread | undefined => {
  const unread = joinedRoom.unread_notifications;

  if (!unread) {
    return undefined;
  }

  const roomUnread: RoomUnread = {
    roomId,
    unread,
  };
  return roomUnread;
};

export const serializeRoomThreadsUnread = (
  roomId: string,
  joinedRoom: JoinedRoom,
): RoomThreadUnread[] => {
  const threadsUnread = joinedRoom.unread_thread_notifications;
  if (!threadsUnread) {
    return [];
  }

  const roomThreadsUnread: RoomThreadUnread[] = Object.keys(threadsUnread).map(
    (eventId) => ({
      roomId,
      eventId,
      unread: threadsUnread[eventId],
    }),
  );

  return roomThreadsUnread;
};
