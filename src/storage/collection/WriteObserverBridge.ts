import { Entry } from "./Entry";
import {
  WriteObserverCallback,
  WriteObserverDisconnectHandler,
  WriteOperation,
} from "./type";

export class WriteObserverBridge<
  PrimaryKey extends string,
  E extends Entry<PrimaryKey>,
> {
  private readonly observers: Set<WriteObserverCallback<PrimaryKey, E>> =
    new Set();

  public onWrite(operation: WriteOperation, keys: E[PrimaryKey][]) {
    this.observers.forEach((observer) => {
      observer(operation, keys);
    });
  }

  public observe(
    observer: WriteObserverCallback<PrimaryKey, E>,
  ): WriteObserverDisconnectHandler {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }
}
