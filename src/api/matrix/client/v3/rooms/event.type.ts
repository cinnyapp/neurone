import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ClientEvent } from "../../../../types";

/**
 * getEvent type
 */
export type GetEventPathParams = {
  roomId: string;
  eventId: string;
};

export type GetEventOK<
  EventContent extends object = object,
  PrevEventContent extends object = object,
> = ClientEvent<EventContent, PrevEventContent>;

export type GetEventEndpoint = MatrixEndpoint<{
  pathParams: GetEventPathParams;
}>;
