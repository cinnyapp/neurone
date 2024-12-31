import { ClientEvent, StateEvent } from "../../../../types";
import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getContext type
 */
export type GetContextPathParams = {
  roomId: string;
  eventId: string;
};
export type GetContextSearchParams = {
  filter?: string;
  limit?: string;
};
export type GetContextOK = {
  end?: string;
  event?: ClientEvent;
  events_after?: ClientEvent[];
  events_before?: ClientEvent[];
  start?: string;
  state?: StateEvent[];
};
export type GetContextEndpoint = MatrixEndpoint<{
  pathParams: GetContextPathParams;
  searchParams?: GetContextSearchParams;
}>;
