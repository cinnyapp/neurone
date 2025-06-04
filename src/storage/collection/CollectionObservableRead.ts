import { CollectionMeta } from "./CollectionMeta";
import { CollectionRead } from "./CollectionRead";
import { Entry, Indexes } from "./Entry";
import { ObservableValue } from "./ObservableValue";
import { QueryRange } from "./QueryRange";
import { WriteObserverBridge } from "./WriteObserverBridge";
import {
  QueryCursor,
  Query,
  WriteObserverCallback,
  WriteOperation,
} from "./type";

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

  public async get(
    key: E[PrimaryKey],
  ): Promise<ObservableValue<E | undefined>> {
    const entry = await this.read.get(key);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(entry, publisherKey);

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = async (
      operation,
      updateKeys,
    ) => {
      const hasUpdate = updateKeys.includes(key);
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
    };

    const disconnectObserver = this.writeObserverBridge.observe(writeObserver);
    observable.onDispose(publisherKey, disconnectObserver);

    return observable;
  }

  public async getMultiple(
    keys: E[PrimaryKey][],
  ): Promise<ObservableValue<E[]>> {
    const entries = await this.read.getMultiple(keys);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(entries, publisherKey);

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = async (
      operation,
      updateKeys,
    ) => {
      const hasUpdate = updateKeys.some((k) => keys.includes(k));
      if (!hasUpdate) return;

      if (operation === WriteOperation.PUT) {
        const e = await this.read.getMultiple(keys);
        observable.publish(publisherKey, e);
        return;
      }
      if (operation === WriteOperation.DELETE) {
        const remainingKeys = keys.filter((k) => updateKeys.includes(k));
        const e = await this.read.getMultiple(remainingKeys);
        observable.publish(publisherKey, e);
        return;
      }
    };

    const disconnectObserver = this.writeObserverBridge.observe(writeObserver);
    observable.onDispose(publisherKey, disconnectObserver);

    return observable;
  }

  public async query(
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[]>> {
    let accessedKeys: E[PrimaryKey][] = [];

    const cacheKeys = (entries: E[]) => {
      accessedKeys = entries.map((entry) => entry[this.meta.primaryKey]);
    };

    const entries = await this.read.query(query, cursor);
    cacheKeys(entries);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(entries, publisherKey);

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = async (
      operation,
      updateKeys,
    ) => {
      if (accessedKeys.some((key) => updateKeys.includes(key))) {
        const e = await this.read.query(query, cursor);
        cacheKeys(e);
        observable.publish(publisherKey, e);
        return;
      }
      if (operation === WriteOperation.PUT) {
        const updatedEntries = await this.read.getMultiple(updateKeys);
        const hasUpdate = updatedEntries.some((entry) =>
          query instanceof QueryRange
            ? query.includes(entry[this.meta.primaryKey])
            : entry[this.meta.primaryKey] === query,
        );

        if (hasUpdate) {
          const e = await this.read.query(query, cursor);
          cacheKeys(e);
          observable.publish(publisherKey, e);
        }
      }
    };

    const disconnectObserver = this.writeObserverBridge.observe(writeObserver);
    observable.onDispose(publisherKey, disconnectObserver);

    return observable;
  }

  public async queryIndex<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<ObservableValue<E[]>> {
    let accessedKeys: E[PrimaryKey][] = [];

    const cacheKeys = (entries: E[]) => {
      accessedKeys = entries.map((entry) => entry[this.meta.primaryKey]);
    };
    const entries = await this.read.queryIndex(indexKey, query, cursor);
    cacheKeys(entries);

    const publisherKey = Math.random().toString();
    const observable = new ObservableValue(entries, publisherKey);

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = async (
      operation,
      updateKeys,
    ) => {
      if (accessedKeys.some((key) => updateKeys.includes(key))) {
        const e = await this.read.queryIndex(indexKey, query, cursor);
        cacheKeys(e);
        observable.publish(publisherKey, e);
        return;
      }

      if (operation === WriteOperation.PUT) {
        const updatedEntries = await this.read.getMultiple(updateKeys);
        const hasUpdate = updatedEntries.some((entry) =>
          query instanceof QueryRange
            ? query.includes(entry[indexKey])
            : entry[indexKey] === query,
        );

        if (hasUpdate) {
          const e = await this.read.queryIndex(indexKey, query, cursor);
          cacheKeys(e);
          observable.publish(publisherKey, e);
        }
      }
    };

    const disconnectObserver = this.writeObserverBridge.observe(writeObserver);
    observable.onDispose(publisherKey, disconnectObserver);

    return observable;
  }
}
