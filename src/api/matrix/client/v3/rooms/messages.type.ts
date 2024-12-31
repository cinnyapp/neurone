import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ClientEvent, StateEvent } from "../../../../types";

/**
 * getMessages types
 */
export type GetMessagesPathParams = {
  roomId: string;
};
export type GetMessagesSearchParams = {
  dir: "b" | "f";
  filter?: string;
  from?: string;
  limit?: string;
  to?: string;
};

export type GetMessagesOK = {
  chunk: ClientEvent[];
  start: string;
  end?: string;
  state?: StateEvent[];
};
export type GetMessagesEndpoint = MatrixEndpoint<{
  pathParams: GetMessagesPathParams;
  searchParams: GetMessagesSearchParams;
}>;
