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

export type EventFilter = {
  limit?: number;
  not_senders?: string[];
  not_types?: string[];
  senders?: string[];
  types?: string[];
};

/**
 * @deprecated In spec version v1.13 - Use `RoomEventFilter` instead
 */
export type StateFilter = {
  contains_url?: boolean;
  include_redundant_members?: boolean;
  lazy_load_members?: boolean;
  limit?: number;
  not_rooms?: string[];
  not_senders?: string[];
  not_types?: string[];
  rooms?: string[];
  senders?: string[];
  types?: string[];
  unread_thread_notifications?: boolean;
};

export type RoomEventFilter = {
  contains_url?: boolean;
  include_redundant_members?: boolean;
  lazy_load_members?: boolean;
  limit?: number;
  not_rooms?: string[];
  not_senders?: string[];
  not_types?: string[];
  rooms?: string[];
  senders?: string[];
  types?: string[];
  unread_thread_notifications?: boolean;
};

export type RoomFilter = {
  account_data?: RoomEventFilter;
  ephemeral?: RoomEventFilter;
  include_leave?: boolean;
  not_rooms?: string[];
  rooms?: string[];
  state?: RoomEventFilter;
  timeline?: RoomEventFilter;
};

export type FilterEventFormat = "client" | "federation";

export type Filter = {
  account_data?: EventFilter;
  event_fields?: string[];
  event_format?: FilterEventFormat;
  presence?: EventFilter;
  room?: RoomFilter;
};
