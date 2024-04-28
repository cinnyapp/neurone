import { TimelineEvent } from "../../v3/rooms/event.type";

/**
 * threads types
 */
export type ThreadsPathParams = {
  roomId: string;
};
export type ThreadsSearchParams = {
  from?: string;
  include?: "all" | "participated";
  limit?: string;
};
export type ThreadsOK = {
  chunk: TimelineEvent[];
  next_batch: string;
};
