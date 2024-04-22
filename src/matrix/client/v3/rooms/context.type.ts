import { ClientEvent } from "./event.type";
import { StateEvent } from "./state.type";

/**
 * context type
 */
export type ContextPathParams = {
  roomId: string;
  eventId: string;
};
export type ContextSearchParams = {
  filter?: string;
  limit?: string;
};
export type ContextOK = {
  end?: string;
  event?: ClientEvent;
  events_after?: ClientEvent[];
  events_before?: ClientEvent[];
  start?: string;
  state?: StateEvent[];
};
