export type StateEvent<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = {
  event_id: string;
  room_id: string;
  sender: string;
  state_key: string;
  type: string;
  content: EventContent;
  origin_server_ts: number;
  unsigned?: UnsignedData;
};

/**
 * state types
 */
export type StatePathParams = {
  roomId: string;
};

export type StateOK = StateEvent[];

/**
 * stateEvent types
 */
export type StateEventPathParams = {
  roomId: string;
  eventType: string;
  stateKey: string;
};

export type StateEventOK<Content extends object> = Content;

/**
 * putStateEvent types
 */
export type PutStateEventPathParams = {
  roomId: string;
  eventType: string;
  stateKey: string;
};

export type PutStateEventOK = {
  event_id: string;
};
