import { CollectionMeta } from "./collection/CollectionMeta";
import { Entry, Indexes } from "./collection/Entry";
import { QueryCursor, Query } from "./collection/type";

export interface StorageDriver {
  getEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    keys: E[PrimaryKey][],
  ): Promise<Array<E | undefined>>;

  getAllEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
  ): Promise<E[]>;

  putEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    data: E[],
  ): Promise<void>;

  deleteEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    keys: E[PrimaryKey][],
  ): Promise<void>;

  queryEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<E[]>;

  queryIndexEntries<
    IndexKey extends Indexes = never,
    E extends Entry<string, IndexKey> = never,
  >(
    collectionMeta: CollectionMeta<string>,
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<E[]>;

  queryKeys<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<E[PrimaryKey][]>;

  queryIndexKeys<
    PrimaryKey extends string,
    IndexKey extends Indexes = never,
    E extends Entry<PrimaryKey, IndexKey> = never,
  >(
    collectionMeta: CollectionMeta<PrimaryKey>,
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<E[PrimaryKey][]>;
}
