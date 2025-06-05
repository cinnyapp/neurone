export type ObservableValueListener<T> = (value: T) => void;

const ERR_PUBLISHER_ONLY = "Only the publisher can perform this action.";
const ERR_DISPOSED = "Cannot operate on a disposed ObservableValue.";
const ERR_DISPOSE_ALREADY_REGISTERED = "Dispose callback already registered.";

export class ObservableValue<T> {
  private value: T;
  private readonly publisherKey: string;
  private readonly listeners: Set<ObservableValueListener<T>> = new Set();

  private disposed: boolean = false;

  private onDisposeCallback: (() => void) | undefined;

  constructor(value: T, publisherKey: string) {
    this.value = value;
    this.publisherKey = publisherKey;
  }

  public get read() {
    return this.value;
  }

  public get isDisposed() {
    return this.disposed;
  }

  public onDispose(publisherKey: string, callback: () => void) {
    if (publisherKey !== this.publisherKey) {
      throw new Error(ERR_PUBLISHER_ONLY);
    }

    if (this.onDisposeCallback) {
      throw new Error(ERR_DISPOSE_ALREADY_REGISTERED);
    }

    this.onDisposeCallback = callback;
  }

  public dispose() {
    if (this.disposed) {
      throw new Error(ERR_DISPOSED);
    }

    this.listeners.clear();
    this.onDisposeCallback?.();
    this.onDisposeCallback = undefined;
    this.disposed = true;
  }

  public unsubscribe(listener: ObservableValueListener<T>) {
    this.listeners.delete(listener);
  }

  public subscribe(listener: ObservableValueListener<T>) {
    if (this.disposed) {
      throw new Error(ERR_DISPOSED);
    }
    this.listeners.add(listener);

    return () => this.unsubscribe(listener);
  }

  public publish(publisherKey: string, value: T) {
    if (publisherKey !== this.publisherKey) {
      throw new Error(ERR_PUBLISHER_ONLY);
    }

    if (this.disposed) {
      throw new Error(ERR_DISPOSED);
    }

    this.value = value;

    this.listeners.forEach((listener) => {
      listener(this.read);
    });
  }
}
