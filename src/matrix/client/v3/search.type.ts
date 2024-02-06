import { RoomEventFilter } from "./user/filter.type";

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

export type RoomEventsCriteria = {
  event_context?: IncludeEventContext;
  filter?: RoomEventFilter;
  groupings?: SearchEventGroupings;
  include_state?: boolean;
  keys?: string[];
  order_by?: string;
  search_term: string;
};

export type SearchCategories = {
  room_events: RoomEventsCriteria;
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
