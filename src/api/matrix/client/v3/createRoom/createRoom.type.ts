/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { DirectoryRoomVisibility, ThirdPartyIdInvite } from "../../../../types";

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
  invite_3pid?: ThirdPartyIdInvite[];
  is_direct?: boolean;
  name?: string;
  power_level_content_override?: object;
  preset?: CreateRoomPreset;
  room_alias_name?: string;
  room_version?: string;
  topic?: string;
  visibility?: DirectoryRoomVisibility;
};

export type PostCreateRoomOK = {
  room_id: string;
};

export type PostCreateRoomEndpoint = MatrixEndpoint<{
  body?: PostCreateRoomBody;
}>;
