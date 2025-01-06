import { IDBPDatabase, wrap } from "idb";
import { StorageDriver } from "../StorageDriver";
import {
  CollectionMeta,
  Entry,
  KeyValue,
  QueryDirection,
  QueryMatch,
  QueryRange,
} from "../collection";

export class IndexedDBStorageDriver implements StorageDriver {
  private readonly db: IDBPDatabase;

  constructor(db: IDBDatabase) {
    this.db = wrap(db);
  }

  private getIDBKeyRange<T extends KeyValue>(
    queryRange: QueryRange<T>,
  ): IDBKeyRange | null {
    const { lower, upper } = queryRange;

    if (lower !== undefined && upper !== undefined) {
      try {
        return IDBKeyRange.bound(lower, upper);
      } catch {
        return null;
      }
    }
    if (lower !== undefined) {
      try {
        return IDBKeyRange.lowerBound(lower);
      } catch {
        return null;
      }
    }
    if (upper !== undefined) {
      try {
        return IDBKeyRange.upperBound(upper);
      } catch {
        return null;
      }
    }
    return null;
  }

  private getIDBCursorDirection(direction: QueryDirection): IDBCursorDirection {
    if (direction.dir === "Prev") {
      return direction.unique ? "prevunique" : "prev";
    }
    return direction.unique ? "nextunique" : "next";
  }

  async getEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    keys: E[PrimaryKey][],
  ): Promise<E[]> {
    const txn = this.db.transaction(collectionMeta.name, "readonly");
    const itemsPromises = keys.map((key) => {
      const item = txn.store.get(key as string) as Promise<E>;
      return item;
    });

    const result = await Promise.allSettled(itemsPromises);
    const values: E[] = [];
    result.forEach((item) => {
      if (item.status === "fulfilled") {
        values.push(item.value);
      }
    });

    return values;
  }

  async putEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    data: E[],
  ): Promise<void> {
    const txn = this.db.transaction(collectionMeta.name, "readwrite");
    const promises = data.map((entry) => txn.store.put(entry));

    await Promise.allSettled(promises);
  }

  async deleteEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    keys: E[PrimaryKey][],
  ): Promise<void> {
    const txn = this.db.transaction(collectionMeta.name, "readwrite");
    const promises = keys.map((key) => txn.store.delete(key as string));

    await Promise.allSettled(promises);
  }

  async queryEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    match: QueryMatch<E[PrimaryKey]>,
    direction?: QueryDirection | undefined,
  ): Promise<E[]> {
    const txn = this.db.transaction(collectionMeta.name, "readwrite");

    let cursor = await txn.store.openCursor(
      match instanceof QueryRange
        ? this.getIDBKeyRange(match)
        : (match as string),
      direction ? this.getIDBCursorDirection(direction) : undefined,
    );

    const entries: E[] = [];
    while (cursor) {
      entries.push(cursor.value);
      cursor = await cursor.continue();
    }

    return entries;
  }

  async queryIndexEntries<
    IndexKey extends string = never,
    E extends Entry<string, IndexKey> = never,
  >(
    indexKey: IndexKey,
    collectionMeta: CollectionMeta<string>,
    match: QueryMatch<E[IndexKey]>,
    direction?: QueryDirection | undefined,
  ): Promise<E[]> {
    const txn = this.db.transaction(collectionMeta.name, "readwrite");

    const index = txn.store.index(indexKey);
    let cursor = await index.openCursor(
      match instanceof QueryRange
        ? this.getIDBKeyRange(match)
        : (match as string),
      direction ? this.getIDBCursorDirection(direction) : undefined,
    );

    const entries: E[] = [];
    while (cursor) {
      entries.push(cursor.value);
      cursor = await cursor.continue();
    }

    return entries;
  }
}
