import { Entry, KeyValue } from "./Entry";
import { QueryRange } from "./QueryRange";

export type QueryDirection = {
  dir?: "Next" | "Prev";
  unique?: boolean;
};

export type QueryMatch<T extends KeyValue> = T | QueryRange<T>;

export enum WriteOperation {
  PUT = "PUT",
  DELETE = "DELETE",
}

export type WriteObserverDisconnectHandler = () => void;
export type WriteObserverCallback<
  PrimaryKey extends string,
  E extends Entry<PrimaryKey>,
> = (operation: WriteOperation, keys: E[PrimaryKey][]) => void;
