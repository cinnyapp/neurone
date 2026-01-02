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
