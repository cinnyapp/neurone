import { TimelineEvent } from "./event.type";
import { StateEvent } from "./state.type";

/**
 * messages types
 */
export type MessagesPathParams = {
  roomId: string;
};
export type MessagesSearchParams = {
  dir: "b" | "f";
  filter?: string;
  from?: string;
  limit?: string;
  to?: string;
};

export type MessagesOK = {
  chunk: TimelineEvent[];
  start: string;
  end?: string;
  state?: StateEvent[];
};
