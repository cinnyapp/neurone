import { Entry } from "./Entry";

export type QueryDirection = {
  dir?: "Next" | "Prev";
  unique?: boolean;
};

// QueryRange should be a class to check its type
export type QueryRange<T> = {
  lowerBound?: T;
  upperBound?: T;
};

export type QueryMatch<T> = T | QueryRange<T>;

export enum WriteOperation {
  PUT = "PUT",
  DELETE = "DELETE",
}

export type WriteObserverDisconnectHandler = () => void;
export type WriteObserverCallback<
  PrimaryKey extends string,
  E extends Entry<PrimaryKey>,
> = (operation: WriteOperation, keys: E[PrimaryKey][]) => void;
