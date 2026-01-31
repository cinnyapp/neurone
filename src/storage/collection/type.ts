import { Entry, Indexes, KeyValue } from "./Entry";
import { QueryRange } from "./QueryRange";

export type QueryCursor = {
  dir?: "Next" | "Prev";
  unique?: boolean;
  limit?: number;
};

export type Query<T extends KeyValue> = T | QueryRange<T>;

export type WriteObserverDisconnectHandler = () => void;

export interface WriteObserver<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> {
  onDelete: (keys: E[PrimaryKey][]) => void;
  onPut: (entries: E[]) => void;
}
