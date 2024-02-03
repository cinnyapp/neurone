import { ClientEvent } from "../../v3/rooms/event.type";

/**
 * relations types
 */
export type RelationsPathParams = {
  roomId: string;
  eventId: string;
};

export type RelationsSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: string;
  to?: string;
};

export type RelationsOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};

/**
 * relationsRelType types
 */
export type RelationsRelTypePathParams = {
  roomId: string;
  eventId: string;
  relType: string;
};

export type RelationsRelTypeSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: string;
  to?: string;
};

export type RelationsRelTypeOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};

/**
 * relationsRelTypeEventType types
 */
export type RelationsRelTypeEventTypePathParams = {
  roomId: string;
  eventId: string;
  relType: string;
  eventType: string;
};

export type RelationsRelTypeEventTypeSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: string;
  to?: string;
};

export type RelationsRelTypeEventTypeOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};
