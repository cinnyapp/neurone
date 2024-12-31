import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { StateEvent } from "../../../../types";

/**
 * getState types
 */
export type GetStatePathParams = {
  roomId: string;
};

export type GetStateOK = StateEvent[];
export type GetStateEnpoint = MatrixEndpoint<{
  pathParams: GetStatePathParams;
}>;

/**
 * getStateEvent types
 */
export type GetStateEventPathParams = {
  roomId: string;
  eventType: string;
  stateKey: string;
};

export type GetStateEventOK<Content extends object> = Content;

export type GetStateEventEndpoint = MatrixEndpoint<{
  pathParams: GetStateEventPathParams;
}>;

/**
 * putStateEvent types
 */
export type PutStateEventPathParams = {
  roomId: string;
  eventType: string;
  stateKey: string;
};

export type PutStateEventBody = object;

export type PutStateEventOK = {
  event_id: string;
};

export type PutStateEventEndpoint = MatrixEndpoint<{
  pathParams: PutStateEventPathParams;
  body: PutStateEventBody;
}>;
