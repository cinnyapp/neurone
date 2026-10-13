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

export type ObservableValueListener<T> = (value: T) => void;

const ERR_PUBLISHER_ONLY = "Only the publisher can perform this action.";
const ERR_DISPOSED = "Cannot operate on a disposed ObservableValue.";
const ERR_DISPOSE_ALREADY_REGISTERED = "Dispose callback already registered.";

export class ObservableValue<T> implements Disposable {
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
