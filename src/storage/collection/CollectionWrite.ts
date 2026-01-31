import { StorageDriver } from "../StorageDriver";
import { CollectionMeta } from "./CollectionMeta";
import { CollectionOperator } from "./CollectionOperator";
import { Entry, Indexes } from "./Entry";
import { WriteObserverBridge } from "./WriteObserverBridge";

export class CollectionWrite<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> extends CollectionOperator<PrimaryKey> {
  private readonly writeObserverBridge: WriteObserverBridge<
    PrimaryKey,
    IndexKeys,
    E
  >;

  constructor(
    meta: CollectionMeta<PrimaryKey>,
    driver: StorageDriver,
    writeObserverBridge: WriteObserverBridge<PrimaryKey, IndexKeys, E>,
  ) {
    super(meta, driver);

    this.writeObserverBridge = writeObserverBridge;
  }

  public async put(entry: E): Promise<void> {
    const entries = [entry];
    await this.driver.putEntries<PrimaryKey, E>(this.meta, entries);
    this.writeObserverBridge.onPut(entries);
  }

  public async putMultiple(entries: E[]): Promise<void> {
    if (entries.length === 0) return;

    await this.driver.putEntries<PrimaryKey, E>(this.meta, entries);
    this.writeObserverBridge.onPut(entries);
  }

  public async delete(key: E[PrimaryKey]): Promise<void> {
    const keys = [key];
    await this.driver.deleteEntries<PrimaryKey, E>(this.meta, keys);
    this.writeObserverBridge.onDelete(keys);
  }

  public async deleteMultiple(keys: E[PrimaryKey][]): Promise<void> {
    if (keys.length === 0) return;

    await this.driver.deleteEntries<PrimaryKey, E>(this.meta, keys);
    this.writeObserverBridge.onDelete(keys);
  }
}
