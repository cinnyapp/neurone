import { CollectionMeta } from "./collection/CollectionMeta";
import { Entry, Indexes } from "./collection/Entry";
import { QueryDirection, QueryMatch } from "./collection/type";

export interface StorageDriver {
  getEnteries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    keys: E[PrimaryKey][],
  ): Promise<E[]>;

  putEnteries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    data: E[],
  ): Promise<void>;

  deleteEnteries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    keys: E[PrimaryKey][],
  ): Promise<void>;

  queryEnteries<PrimaryKey extends string, E extends Entry<PrimaryKey>>(
    collectionMeta: CollectionMeta<PrimaryKey>,
    match: QueryMatch<E[PrimaryKey]>,
    direction?: QueryDirection,
  ): Promise<E[]>;

  queryIndexEnteries<
    IndexKey extends Indexes = never,
    E extends Entry<string, IndexKey> = never,
  >(
    indexKey: IndexKey,
    collectionMeta: CollectionMeta<string>,
    match: QueryMatch<E[IndexKey]>,
    direction?: QueryDirection,
  ): Promise<E[]>;
}
