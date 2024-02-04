import { ClientEvent } from "./event.type";

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
  state?: ClientEvent[];
};
