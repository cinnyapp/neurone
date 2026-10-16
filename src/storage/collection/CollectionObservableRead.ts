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

import { CollectionMeta } from "./CollectionMeta";
import { CollectionRead } from "./CollectionRead";
import { Entry, Indexes, KeyValue } from "./Entry";
import { ObservableValue } from "../../utils/observable/ObservableValue";
import { QueryRange } from "./QueryRange";
import { WriteObserverBridge } from "./WriteObserverBridge";
import { QueryCursor, Query, WriteObserver } from "./type";

const equalKeyValue = (a: KeyValue, b: KeyValue) => {
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    return a.every((item, index) => item === b[index]);
  }

  return a === b;
};

export class CollectionObservableRead<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> {
  private readonly meta: CollectionMeta<PrimaryKey>;
  private readonly read: CollectionRead<PrimaryKey, IndexKeys, E>;
  private readonly writeObserverBridge: WriteObserverBridge<
    PrimaryKey,
    IndexKeys,
    E
  >;

  constructor(
    meta: CollectionMeta<PrimaryKey>,
    read: CollectionRead<PrimaryKey, IndexKeys, E>,
    writeObserverBridge: WriteObserverBridge<PrimaryKey, IndexKeys, E>,
  ) {
    this.meta = meta;
    this.read = read;
    this.writeObserverBridge = writeObserverBridge;
  }

  private bridgeObservable<T>(
    observable: ObservableValue<T>,
    publisherKey: string,
    writeObserver: WriteObserver<PrimaryKey, IndexKeys, E>,
  ) {
    const disconnectObserver = this.writeObserverBridge.observe(writeObserver);
    observable.onDispose(publisherKey, disconnectObserver);
  }

  private entriesHasQueriedEntry<K extends PrimaryKey | IndexKeys>(
    key: K,
    query: Query<E[K]>,
    entries: Array<E | undefined>,
  ) {
    return entries.some((entry) => {
      if (!entry) return false;
      return query instanceof QueryRange
        ? query.includes(entry[key])
        : equalKeyValue(entry[key], query);
    });
  }

  private entriesHasAnyKey(keys: E[PrimaryKey][], entries: E[]): boolean {
    return entries.some((entry) =>
      keys.some((key) => equalKeyValue(entry[this.meta.primaryKey], key)),
    );
  }

  private entriesHasAnyEntry(
    updatedEntries: Array<E | undefined>,
    currentKeys: E[PrimaryKey][],
  ): boolean {
    return updatedEntries.some(
      (entry) =>
        entry !== undefined &&
        this.keysIncludes(currentKeys, entry[this.meta.primaryKey]),
    );
  }

  private keysHasAnyKey(
    keys: E[PrimaryKey][],
    entryKeys: E[PrimaryKey][],
  ): boolean {
    return entryKeys.some((key) => keys.find((k) => equalKeyValue(k, key)));
  }

  private keysIncludes(keys: E[PrimaryKey][], key: E[PrimaryKey]): boolean {
    return keys.some((k) => equalKeyValue(k, key));
  }

  private hasEntry(entries: E[], key: E[PrimaryKey]): boolean {
    return entries.some((e) => equalKeyValue(e[this.meta.primaryKey], key));
  }

  private findEntry(entries: E[], key: E[PrimaryKey]): E | undefined {
    return entries.find((e) => equalKeyValue(e[this.meta.primaryKey], key));
  }

  public async get(
    key: E[PrimaryKey],
  ): Promise<ObservableValue<E | undefined>> {
    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(
      await this.read.get(key),
      publisherKey,
    );

    this.bridgeObservable(observable, publisherKey, {
      onDelete: (deletedKeys) => {
        if (!this.keysIncludes(deletedKeys, key)) return;
        observable.publish(publisherKey, undefined);
      },
      onPut: (updatedEntries) => {
        const updatedEntry = this.findEntry(updatedEntries, key);
        if (!updatedEntry) return;
        observable.publish(publisherKey, updatedEntry);
      },
    });

    return observable;
  }

  public async getAll(): Promise<ObservableValue<E[]>> {
    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(
      await this.read.getAll(),
      publisherKey,
    );

    this.bridgeObservable(observable, publisherKey, {
      onDelete: (deletedKeys) => {
        const newEntries = observable.read.filter(
          (e) => !this.keysIncludes(deletedKeys, e[this.meta.primaryKey]),
        );
        observable.publish(publisherKey, newEntries);
      },
      onPut: async (updatedEntries) => {
        const newEntries = observable.read
          .filter(
            (e) => !this.hasEntry(updatedEntries, e[this.meta.primaryKey]),
          )
          .concat(updatedEntries);
        observable.publish(publisherKey, newEntries);
      },
    });

    return observable;
  }

  public async getMultiple(
    keys: E[PrimaryKey][],
  ): Promise<ObservableValue<Array<E | undefined>>> {
    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(
      await this.read.getMultiple(keys),
      publisherKey,
    );

    this.bridgeObservable(observable, publisherKey, {
      onDelete: (deletedKeys) => {
        if (!this.keysHasAnyKey(deletedKeys, keys)) return;
        const newEntries = observable.read.map((en) =>
          en && this.keysIncludes(deletedKeys, en[this.meta.primaryKey])
            ? undefined
            : en,
        );
        observable.publish(publisherKey, newEntries);
      },
      onPut: (updatedEntries) => {
        if (!this.entriesHasAnyKey(keys, updatedEntries)) return;

        const existing = observable.read;
        const newEntries: Array<E | undefined> = [];

        keys.forEach((key, index) => {
          const update = this.findEntry(updatedEntries, key);
          newEntries.push(update ?? existing[index]);
        });

        observable.publish(publisherKey, newEntries);
      },
    });

    return observable;
  }

  public async query(
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[]>> {
    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(
      await this.read.query(query, cursor),
      publisherKey,
    );

    this.bridgeObservable(observable, publisherKey, {
      onDelete: async (deletedKeys) => {
        if (this.entriesHasAnyKey(deletedKeys, observable.read)) {
          const e = await this.read.query(query, cursor);
          observable.publish(publisherKey, e);
          return;
        }
      },
      onPut: async (updatedEntries) => {
        if (
          this.entriesHasQueriedEntry(
            this.meta.primaryKey,
            query,
            updatedEntries,
          )
        ) {
          const e = await this.read.query(query, cursor);
          observable.publish(publisherKey, e);
        }
      },
    });

    return observable;
  }

  public async queryIndex<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[]>> {
    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(
      await this.read.queryIndex(indexKey, query, cursor),
      publisherKey,
    );

    this.bridgeObservable(observable, publisherKey, {
      onDelete: async (deletedKeys) => {
        if (this.entriesHasAnyKey(deletedKeys, observable.read)) {
          const e = await this.read.queryIndex(indexKey, query, cursor);
          observable.publish(publisherKey, e);
          return;
        }
      },
      onPut: async (updatedEntries) => {
        if (
          this.entriesHasQueriedEntry(indexKey, query, updatedEntries) ||
          this.entriesHasAnyEntry(
            updatedEntries,
            observable.read.map((e) => e[this.meta.primaryKey]),
          )
        ) {
          const e = await this.read.queryIndex(indexKey, query, cursor);
          observable.publish(publisherKey, e);
        }
      },
    });

    return observable;
  }

  public async queryKeys(
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[PrimaryKey][]>> {
    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(
      await this.read.queryKeys(query, cursor),
      publisherKey,
    );

    this.bridgeObservable(observable, publisherKey, {
      onDelete: async (deletedKeys) => {
        if (this.keysHasAnyKey(deletedKeys, observable.read)) {
          const k = await this.read.queryKeys(query, cursor);
          observable.publish(publisherKey, k);
          return;
        }
      },
      onPut: async (updatedEntries) => {
        if (
          this.entriesHasQueriedEntry(
            this.meta.primaryKey,
            query,
            updatedEntries,
          )
        ) {
          const k = await this.read.queryKeys(query, cursor);
          observable.publish(publisherKey, k);
        }
      },
    });

    return observable;
  }

  public async queryIndexKeys<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[PrimaryKey][]>> {
    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(
      await this.read.queryIndexKeys(indexKey, query, cursor),
      publisherKey,
    );

    this.bridgeObservable(observable, publisherKey, {
      onDelete: async (deletedKeys) => {
        if (this.keysHasAnyKey(deletedKeys, observable.read)) {
          const k = await this.read.queryIndexKeys(indexKey, query, cursor);
          observable.publish(publisherKey, k);
          return;
        }
      },
      onPut: async (updatedEntries) => {
        if (
          this.entriesHasQueriedEntry(indexKey, query, updatedEntries) ||
          this.entriesHasAnyEntry(updatedEntries, observable.read)
        ) {
          const k = await this.read.queryIndexKeys(indexKey, query, cursor);
          observable.publish(publisherKey, k);
        }
      },
    });

    return observable;
  }
}
