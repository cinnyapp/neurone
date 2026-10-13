/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
