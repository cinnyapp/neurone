import { TimelineEvent } from "./event.type";
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
  event?: TimelineEvent;
  events_after?: TimelineEvent[];
  events_before?: TimelineEvent[];
  start?: string;
  state?: StateEvent[];
};
