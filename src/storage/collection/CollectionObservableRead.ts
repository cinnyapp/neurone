import { CollectionMeta } from "./CollectionMeta";
import { CollectionRead } from "./CollectionRead";
import { Entry, Indexes, KeyValue } from "./Entry";
import { ObservableValue } from "./ObservableValue";
import { QueryRange } from "./QueryRange";
import { WriteObserverBridge } from "./WriteObserverBridge";
import {
  QueryCursor,
  Query,
  WriteObserverCallback,
  WriteOperation,
} from "./type";

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
  private readonly writeObserverBridge: WriteObserverBridge<PrimaryKey, E>;

  constructor(
    meta: CollectionMeta<PrimaryKey>,
    read: CollectionRead<PrimaryKey, IndexKeys, E>,
    writeObserverBridge: WriteObserverBridge<PrimaryKey, E>,
  ) {
    this.meta = meta;
    this.read = read;
    this.writeObserverBridge = writeObserverBridge;
  }

  private bridgeObservable<T>(
    observable: ObservableValue<T>,
    publisherKey: string,
    onWrite: WriteObserverCallback<PrimaryKey, E>,
  ) {
    const disconnectObserver = this.writeObserverBridge.observe(onWrite);
    observable.onDispose(publisherKey, disconnectObserver);

    return observable;
  }

  private entriesHasQueriedEntry<K extends PrimaryKey | IndexKeys>(
    key: K,
    query: Query<E[K]>,
    entries: E[],
  ) {
    return entries.some((entry) =>
      query instanceof QueryRange
        ? query.includes(entry[key])
        : equalKeyValue(entry[key], query),
    );
  }

  private entriesHasAnyKey(keys: E[PrimaryKey][], entries: E[]) {
    return keys.some((key) =>
      entries.find((entry) => equalKeyValue(entry[this.meta.primaryKey], key)),
    );
  }

  private keysHasAnyKey(keys: E[PrimaryKey][], entryKeys: E[PrimaryKey][]) {
    return keys.some((key) => entryKeys.find((k) => equalKeyValue(k, key)));
  }

  public async get(
    key: E[PrimaryKey],
  ): Promise<ObservableValue<E | undefined>> {
    const entry = await this.read.get(key);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(entry, publisherKey);

    this.bridgeObservable(
      observable,
      publisherKey,
      async (operation, updateKeys) => {
        const hasUpdate = updateKeys.some((k) => equalKeyValue(k, key));
        if (!hasUpdate) return;

        if (operation === WriteOperation.PUT) {
          const e = await this.read.get(key);
          observable.publish(publisherKey, e);
          return;
        }

        if (operation === WriteOperation.DELETE) {
          observable.publish(publisherKey, undefined);
          return;
        }
      },
    );

    return observable;
  }

  public async getMultiple(
    keys: E[PrimaryKey][],
  ): Promise<ObservableValue<E[]>> {
    const entries = await this.read.getMultiple(keys);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(entries, publisherKey);

    this.bridgeObservable(
      observable,
      publisherKey,
      async (operation, updateKeys) => {
        if (!this.keysHasAnyKey(updateKeys, keys)) return;

        if (operation === WriteOperation.PUT) {
          const e = await this.read.getMultiple(keys);
          observable.publish(publisherKey, e);
          return;
        }
        if (operation === WriteOperation.DELETE) {
          const remainingKeys = keys.filter((key) =>
            updateKeys.some((k) => equalKeyValue(k, key)),
          );
          const e = await this.read.getMultiple(remainingKeys);
          observable.publish(publisherKey, e);
          return;
        }
      },
    );

    return observable;
  }

  public async query(
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[]>> {
    const entries = await this.read.query(query, cursor);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(entries, publisherKey);

    this.bridgeObservable(
      observable,
      publisherKey,
      async (operation, updateKeys) => {
        if (this.entriesHasAnyKey(updateKeys, observable.read)) {
          const e = await this.read.query(query, cursor);
          observable.publish(publisherKey, e);
          return;
        }
        if (operation === WriteOperation.PUT) {
          const updatedEntries = await this.read.getMultiple(updateKeys);

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
        }
      },
    );

    return observable;
  }

  public async queryIndex<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[]>> {
    const entries = await this.read.queryIndex(indexKey, query, cursor);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(entries, publisherKey);

    this.bridgeObservable(
      observable,
      publisherKey,
      async (operation, updateKeys) => {
        if (this.entriesHasAnyKey(updateKeys, observable.read)) {
          const e = await this.read.queryIndex(indexKey, query, cursor);
          observable.publish(publisherKey, e);
          return;
        }

        if (operation === WriteOperation.PUT) {
          const updatedEntries = await this.read.getMultiple(updateKeys);

          if (this.entriesHasQueriedEntry(indexKey, query, updatedEntries)) {
            const e = await this.read.queryIndex(indexKey, query, cursor);
            observable.publish(publisherKey, e);
          }
        }
      },
    );

    return observable;
  }

  public async queryKeys(
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[PrimaryKey][]>> {
    const keys = await this.read.queryKeys(query, cursor);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(keys, publisherKey);

    this.bridgeObservable(
      observable,
      publisherKey,
      async (operation, updateKeys) => {
        if (this.keysHasAnyKey(updateKeys, observable.read)) {
          const k = await this.read.queryKeys(query, cursor);
          observable.publish(publisherKey, k);
          return;
        }
        if (operation === WriteOperation.PUT) {
          const updatedEntries = await this.read.getMultiple(updateKeys);

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
        }
      },
    );

    return observable;
  }

  public async queryIndexKeys<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[PrimaryKey][]>> {
    const keys = await this.read.queryIndexKeys(indexKey, query, cursor);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(keys, publisherKey);

    this.bridgeObservable(
      observable,
      publisherKey,
      async (operation, updateKeys) => {
        if (this.keysHasAnyKey(updateKeys, observable.read)) {
          const k = await this.read.queryIndexKeys(indexKey, query, cursor);
          observable.publish(publisherKey, k);
          return;
        }

        if (operation === WriteOperation.PUT) {
          const updatedEntries = await this.read.getMultiple(updateKeys);

          if (this.entriesHasQueriedEntry(indexKey, query, updatedEntries)) {
            const k = await this.read.queryIndexKeys(indexKey, query, cursor);
            observable.publish(publisherKey, k);
          }
        }
      },
    );

    return observable;
  }
}
