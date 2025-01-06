import { CollectionMeta } from "./collection/CollectionMeta";
import { Entry, Indexes } from "./collection/Entry";
import { QueryDirection, QueryMatch } from "./collection/type";

export interface StorageDriver {
  getEntries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    keys: E[PrimaryKey][],
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
    match: QueryMatch<E[PrimaryKey]>,
    direction?: QueryDirection,
  ): Promise<E[]>;

  queryIndexEntries<
    IndexKey extends Indexes = never,
    E extends Entry<string, IndexKey> = never,
  >(
    indexKey: IndexKey,
    collectionMeta: CollectionMeta<string>,
    match: QueryMatch<E[IndexKey]>,
    direction?: QueryDirection,
  ): Promise<E[]>;
}
