import { AccountDataEvent } from "../../../matrix/client/v3/sync/sync.type";

export type RoomAccountDataEvent<Content extends object = object> =
  AccountDataEvent<Content> & {
    room_id: string;
  };
