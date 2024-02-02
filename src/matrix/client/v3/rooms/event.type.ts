export type UnsignedData<
  PrevContent extends object = object,
  RedirectedBecause extends object = object,
> = {
  age?: number;
  prev_content?: PrevContent;
  redacted_because?: RedirectedBecause;
  transaction_id?: string;
};

export type ClientEvent<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = {
  event_id: string;
  room_id: string;
  sender: string;
  state_key?: string;
  type: string;
  content: EventContent;
  origin_server_ts: number;
  unsigned?: UnsignedData;
};

/**
 * event type
 */
export type EventPathParams = {
  roomId: string;
  eventId: string;
};

export type EventOK<
  EventContent extends object = object,
  PrevEventContent extends object = object,
> = ClientEvent<EventContent, PrevEventContent>;
