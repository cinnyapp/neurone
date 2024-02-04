import { RoomVisibility } from "./directory/list.type";
import { Invite3PID } from "./rooms/invite.type";

export type CreateRoomStateEvent = {
  content: object;
  state_key?: string;
  type: string;
};

export type CreateRoomPreset =
  | "private_chat"
  | "public_chat"
  | "trusted_private_chat";

/***
 * postCreateRoom types
 */
export type PostCreateRoomBody = {
  creation_content?: object;
  initial_state?: CreateRoomStateEvent[];
  invite?: string[];
  invite_3pid?: Invite3PID[];
  is_direct?: boolean;
  name?: string;
  power_level_content_override?: object;
  preset?: CreateRoomPreset;
  room_alias_name?: string;
  room_version?: string;
  topic?: string;
  visibility?: RoomVisibility;
};

export type PostCreateRoomOK = {
  room_id: string;
};
