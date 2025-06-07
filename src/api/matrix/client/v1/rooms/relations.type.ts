import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ClientEvent } from "../../../../types";

/**
 * getRelations types
 */
export type GetRelationsPathParams = {
  roomId: string;
  eventId: string;
};

export type GetRelationsSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: string;
  recurse?: string;
  to?: string;
};

export type GetRelationsOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};

export type GetRelationsEndpoint = MatrixEndpoint<{
  pathParams: GetRelationsPathParams;
  searchParams?: GetRelationsSearchParams;
}>;

/**
 * getRelationsRelType types
 */
export type GetRelationsRelTypePathParams = {
  roomId: string;
  eventId: string;
  relType: string;
};

export type GetRelationsRelTypeSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: string;
  recurse?: string;
  to?: string;
};

export type GetRelationsRelTypeOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};

export type GetRelationsRelEndpoint = MatrixEndpoint<{
  pathParams: GetRelationsRelTypePathParams;
  searchParams?: GetRelationsRelTypeSearchParams;
}>;

/**
 * getRelationsRelTypeEventType types
 */
export type GetRelationsRelTypeEventTypePathParams = {
  roomId: string;
  eventId: string;
  relType: string;
  eventType: string;
};

export type GetRelationsRelTypeEventTypeSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: string;
  recurse?: string;
  to?: string;
};

export type GetRelationsRelTypeEventTypeOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};

export type GetRelationsRelTypeEndpoint = MatrixEndpoint<{
  pathParams: GetRelationsRelTypeEventTypePathParams;
  searchParams?: GetRelationsRelTypeEventTypeSearchParams;
}>;
