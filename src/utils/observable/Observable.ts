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
