export type EventFilter = {
  limit?: number;
  not_senders?: string[];
  not_types?: string[];
  senders?: string[];
  types?: string[];
};

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
};

export type RoomFilter = {
  account_data?: RoomEventFilter;
  ephemeral?: RoomEventFilter;
  include_leave?: boolean;
  not_rooms?: string[];
  rooms?: string[];
  state?: StateFilter;
  timeline?: RoomEventFilter;
};

export type FilterEventFormat = "client" | "federation";

export type FilterDef = {
  account_data?: EventFilter;
  event_fields?: string[];
  event_format?: FilterEventFormat;
  presence?: EventFilter;
  room?: RoomFilter;
};

/**
 * postFilter types
 */
export type PostFilterPathParams = {
  userId: string;
};

export type PostFilterBody = FilterDef;

export type PostFilterOK = {
  filter_id: string;
};

/**
 * filter types
 */
export type FilterPathParams = {
  userId: string;
  filterId: string;
};

export type FilterOK = FilterDef;
