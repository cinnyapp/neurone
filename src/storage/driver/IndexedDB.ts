import { IDBPDatabase, wrap } from "idb";
import { StorageDriver } from "../StorageDriver";
import {
  CollectionMeta,
  Entry,
  KeyValue,
  QueryCursor,
  Query,
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

  private getIDBCursorDirection(cursor: QueryCursor): IDBCursorDirection {
    if (cursor.dir === "Prev") {
      return cursor.unique ? "prevunique" : "prev";
    }
    return cursor.unique ? "nextunique" : "next";
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
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor | undefined,
  ): Promise<E[]> {
    const txn = this.db.transaction(collectionMeta.name, "readonly");

    let idbCursor = await txn.store.openCursor(
      query instanceof QueryRange
        ? this.getIDBKeyRange(query)
        : (query as string),
      cursor ? this.getIDBCursorDirection(cursor) : undefined,
    );

    const entries: E[] = [];
    while (idbCursor) {
      entries.push(idbCursor.value);
      if (entries.length === cursor?.limit) {
        break;
      }
      idbCursor = await idbCursor.continue();
    }

    return entries;
  }

  async queryIndexEntries<
    IndexKey extends string = never,
    E extends Entry<string, IndexKey> = never,
  >(
    indexKey: IndexKey,
    collectionMeta: CollectionMeta<string>,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor | undefined,
  ): Promise<E[]> {
    const txn = this.db.transaction(collectionMeta.name, "readonly");

    const index = txn.store.index(indexKey);
    let idbCursor = await index.openCursor(
      query instanceof QueryRange
        ? this.getIDBKeyRange(query)
        : (query as string),
      cursor ? this.getIDBCursorDirection(cursor) : undefined,
    );

    const entries: E[] = [];
    while (idbCursor) {
      entries.push(idbCursor.value);
      if (entries.length === cursor?.limit) {
        break;
      }
      idbCursor = await idbCursor.continue();
    }

    return entries;
  }
}
