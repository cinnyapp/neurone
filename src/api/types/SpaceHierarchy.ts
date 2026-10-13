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

import { StrippedStateEvent } from "./StrippedStateEvent";

export type StrippedChildStateEvent = StrippedStateEvent & {
  origin_server_ts: number;
};

export type SpaceHierarchyRoomChunk = {
  allowed_room_ids?: string[];
  avatar_url?: string;
  canonical_alias?: string;
  children_state: StrippedChildStateEvent;
  encryption?: string;
  guest_can_join: boolean;
  join_rule?: string;
  name?: string;
  num_joined_members: number;
  room_id: string;
  room_type?: string;
  room_version?: string;
  topic?: string;
  world_readable: boolean;
};
