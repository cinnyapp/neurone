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
  order_by?: string;
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
