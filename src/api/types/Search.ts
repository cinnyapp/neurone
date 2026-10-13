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

import { ClientEvent } from "./ClientEvent";
import { RoomEventFilter } from "./Filter";
import { UserProfile } from "./User";

export type SearchEventOrder = "recent" | "rank";

export type SearchEventGroup = {
  key?: string;
};

export type SearchEventGroupings = {
  group_by?: SearchEventGroup[];
};

export type IncludeEventContext = {
  after_limit?: number;
  before_limit?: number;
  include_profile?: boolean;
};

export type SearchRoomEventsCriteria = {
  event_context?: IncludeEventContext;
  filter?: RoomEventFilter;
  groupings?: SearchEventGroupings;
  include_state?: boolean;
  keys?: string[];
  order_by?: SearchEventOrder;
  search_term: string;
};

export type SearchCategories = {
  room_events: SearchRoomEventsCriteria;
};

export type SearchEventContext = {
  end?: string;
  events_after?: ClientEvent[];
  events_before?: ClientEvent[];
  profile_info?: Record<string, UserProfile>;
  start?: string;
};

export type SearchResult = {
  context?: SearchEventContext;
  rank?: number;
  result?: ClientEvent;
};

export type SearchResultEventGroup = {
  next_batch?: string;
  order?: number;
  results?: string[];
};

export type SearchResultRoomEvents = {
  count?: number;
  groups?: SearchResultEventGroup;
  highlights?: string[];
  next_batch?: string;
  results?: SearchResult[];
};

export type SearchResultCategories = {
  room_events?: SearchResultRoomEvents;
};
