import { CollectionMeta } from "./CollectionMeta";
import { CollectionRead } from "./CollectionRead";
import { Entry, Indexes } from "./Entry";
import { QueryRange } from "./QueryRange";
import { WriteObserverBridge } from "./WriteObserverBridge";
import {
  QueryDirection,
  QueryMatch,
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

  public get(
    key: E[PrimaryKey],
    observer: (entry: E | undefined) => void,
  ): () => void {
    this.read.get(key).then((entry) => observer(entry));

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = (
      operation,
      data,
    ) => {
      if (operation === WriteOperation.PUT) {
        data.find((entry) => entry);
        this.read.get(key).then((entry) => observer(entry));
        return;
      }
      if (operation === WriteOperation.DELETE) {
        observer(undefined);
        return;
      }
    };

    return this.writeObserverBridge.observe(writeObserver);
  }

  public getMultiple(
    keys: E[PrimaryKey][],
    observer: (entries: E[]) => void,
  ): () => void {
    this.read.getMultiple(keys).then((entries) => observer(entries));

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = (
      operation,
      updateKeys,
    ) => {
      const hasUpdate = updateKeys.some((k) => keys.includes(k));
      if (!hasUpdate) return;

      if (operation === WriteOperation.PUT) {
        this.read.getMultiple(keys).then((entries) => observer(entries));
        return;
      }
      if (operation === WriteOperation.DELETE) {
        const remaningKeys = keys.filter((k) => updateKeys.includes(k));
        this.read
          .getMultiple(remaningKeys)
          .then((entries) => observer(entries));
        return;
      }
    };

    return this.writeObserverBridge.observe(writeObserver);
  }

  public query(
    match: QueryMatch<E[PrimaryKey]>,
    observer: (entries: E[]) => void,
    direction?: QueryDirection,
  ): () => void {
    this.read.query(match, direction).then((entries) => observer(entries));

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = async (
      operation,
      updateKeys,
    ) => {
      if (operation === WriteOperation.DELETE) {
        this.read.query(match, direction).then((entries) => observer(entries));
        return;
      }
      const updatedEntries = await this.read.getMultiple(updateKeys);
      const hasUpdate = updatedEntries.some((entry) => {
        const value = entry[this.meta.primaryKey];
        if (match instanceof QueryRange) {
          return match.includes(value);
        }
        return value === match;
      });

      if (hasUpdate) {
        this.read.query(match, direction).then((entries) => observer(entries));
      }
    };

    return this.writeObserverBridge.observe(writeObserver);
  }
  public queryIndex<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    match: QueryMatch<E[IndexKey]>,
    observer: (entries: E[]) => void,
    direction?: QueryDirection,
  ): () => void {
    this.read
      .queryIndex(indexKey, match, direction)
      .then((entries) => observer(entries));

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = async (
      operation,
      updateKeys,
    ) => {
      if (operation === WriteOperation.DELETE) {
        this.read
          .queryIndex(indexKey, match, direction)
          .then((entries) => observer(entries));
        return;
      }
      const updatedEntries = await this.read.getMultiple(updateKeys);
      const hasUpdate = updatedEntries.some((entry) => {
        const value = entry[indexKey];
        if (match instanceof QueryRange) {
          return match.includes(value);
        }
        return value === match;
      });

      if (hasUpdate) {
        this.read
          .queryIndex(indexKey, match, direction)
          .then((entries) => observer(entries));
      }
    };

    return this.writeObserverBridge.observe(writeObserver);
  }
}
