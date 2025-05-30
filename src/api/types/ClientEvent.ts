export type UnsignedData<
  PrevContent extends object = object,
  RedirectedBecause extends MessageEvent = MessageEvent,
> = {
  age?: number;
  prev_content?: PrevContent;
  redacted_because?: RedirectedBecause;
  transaction_id?: string;
};

export type MessageEvent<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = {
  event_id: string;
  room_id: string;
  sender: string;
  type: string;
  content: EventContent;
  origin_server_ts: number;
  unsigned?: UnsignedData;
};

export type StateEvent<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = { state_key: string } & MessageEvent<EventContent, UnsignedData>;

export type ClientEvent<
  EventContent extends object = object,
  UnsignedData extends object = object,
> =
  | StateEvent<EventContent, UnsignedData>
  | MessageEvent<EventContent, UnsignedData>;

export type ClientEventWithoutRoomId<
  EventContent extends object = object,
  UnsignedData extends object = object,
> =
  | Omit<StateEvent<EventContent, UnsignedData>, "room_id">
  | Omit<MessageEvent<EventContent, UnsignedData>, "room_id">;

export type StateEventWithoutRoomId<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = Omit<StateEvent<EventContent, UnsignedData>, "room_id">;
