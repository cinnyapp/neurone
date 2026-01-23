import { Disposable } from "../disposable";

export type ObservableListener<T> = (value: T) => void;

const ERR_PUBLISHER_ONLY = "Only the publisher can perform this action.";
const ERR_DISPOSED = "Cannot operate on a disposed Observable.";

export class Observable<T> implements Disposable {
  private readonly publisherKey: string;
  private readonly listeners: Set<ObservableListener<T>> = new Set();

  private disposed = false;

  constructor(publisherKey: string) {
    this.publisherKey = publisherKey;
  }

  public get isDisposed() {
    return this.disposed;
  }

  public subscribe(listener: ObservableListener<T>) {
    if (this.disposed) {
      throw new Error(ERR_DISPOSED);
    }

    this.listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  public unsubscribe(listener: ObservableListener<T>) {
    this.listeners.delete(listener);
  }

  public publish(publisherKey: string, value: T) {
    if (publisherKey !== this.publisherKey) {
      throw new Error(ERR_PUBLISHER_ONLY);
    }

    if (this.disposed) {
      throw new Error(ERR_DISPOSED);
    }

    this.listeners.forEach((listener) => listener(value));
  }

  public dispose() {
    if (this.disposed) {
      throw new Error(ERR_DISPOSED);
    }

    this.listeners.clear();
    this.disposed = true;
  }
}
