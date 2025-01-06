import { CollectionOperator } from "./CollectionOperator";
import { Entry, Indexes } from "./Entry";
import { QueryDirection, QueryMatch } from "./type";

export class CollectionRead<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> extends CollectionOperator<PrimaryKey> {
  public async get(key: E[PrimaryKey]): Promise<E | undefined> {
    const [entry] = await this.driver.getEntries<PrimaryKey, E>(this.meta, [
      key,
    ]);

    return entry;
  }

  public async getMultiple(keys: E[PrimaryKey][]): Promise<E[]> {
    const entries = await this.driver.getEntries<PrimaryKey, E>(
      this.meta,
      keys,
    );

    return entries;
  }

  public async query(
    match: QueryMatch<E[PrimaryKey]>,
    direction?: QueryDirection,
  ): Promise<E[]> {
    const entries = this.driver.queryEntries<PrimaryKey, E>(
      this.meta,
      match,
      direction,
    );

    return entries;
  }

  public async queryIndex<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    match: QueryMatch<E[IndexKey]>,
    direction?: QueryDirection,
  ): Promise<E[]> {
    const entries = this.driver.queryIndexEntries<IndexKey, E>(
      indexKey,
      this.meta,
      match,
      direction,
    );

    return entries;
  }
}
