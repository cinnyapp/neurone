import { AccountDataEvent } from "../../../api/types";

export type RoomAccountDataEvent<Content extends object = object> =
  AccountDataEvent<Content> & {
    room_id: string;
  };
