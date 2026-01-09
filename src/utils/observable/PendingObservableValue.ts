import { ObservableValue } from "./ObservableValue";

export type PendingObservableResult<T> =
  | {
      pending: true;
      value?: undefined;
      error?: undefined;
    }
  | {
      pending?: undefined;
      value: T;
      error?: undefined;
    }
  | {
      pending?: undefined;
      value?: undefined;
      error: Error;
    };

export class PendingObservableValue<T> extends ObservableValue<
  PendingObservableResult<T>
> {
  constructor(observablePromise: Promise<ObservableValue<T>>) {
    const publisherKey = Math.random().toString();
    super({ pending: true }, publisherKey);

    let baseObservable: ObservableValue<T> | undefined;

    observablePromise
      .then((observable) => {
        if (this.isDisposed) {
          observable.dispose();
          return;
        }

        baseObservable = observable;

        super.publish(publisherKey, { value: observable.read });
        observable.subscribe((value) => {
          super.publish(publisherKey, { value });
        });
      })
      .catch((anyError) => {
        if (this.isDisposed) return;

        const error: Error =
          anyError instanceof Error
            ? anyError
            : new Error("Failed to retrieve observable.");

        super.publish(publisherKey, { error });
      });

    super.onDispose(publisherKey, () => {
      if (baseObservable && !baseObservable.isDisposed) {
        baseObservable.dispose();
      }
    });
  }
}
