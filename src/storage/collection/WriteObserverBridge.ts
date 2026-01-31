import { Entry, Indexes } from "./Entry";
import { WriteObserver, WriteObserverDisconnectHandler } from "./type";

export class WriteObserverBridge<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> {
  private readonly observers: Set<WriteObserver<PrimaryKey, Indexes, E>> =
    new Set();

  public onPut(entries: E[]): void {
    this.observers.forEach((observer) => {
      observer.onPut(entries);
    });
  }

  public onDelete(keys: E[PrimaryKey][]): void {
    this.observers.forEach((observer) => {
      observer.onDelete(keys);
    });
  }

  public observe(
    observer: WriteObserver<PrimaryKey, Indexes, E>,
  ): WriteObserverDisconnectHandler {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }
}
