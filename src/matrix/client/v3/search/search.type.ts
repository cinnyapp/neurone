import { UserProfile } from "../profile/profile.type";
import { TimelineEvent } from "../rooms/event.type";
import { RoomEventFilter } from "../user/filter.type";

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
  events_after?: TimelineEvent[];
  events_before?: TimelineEvent[];
  profile_info?: Record<string, UserProfile>;
  start?: string;
};

export type SearchResult = {
  context?: SearchEventContext;
  rank?: number;
  result?: TimelineEvent;
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

/**
 * postSearch types
 */
export type PostSearchSearchParams = {
  next_batch?: string;
};
export type PostSearchBody = {
  search_categories: SearchCategories;
};
export type PostSearchOK = {
  search_categories: SearchResultCategories;
};
