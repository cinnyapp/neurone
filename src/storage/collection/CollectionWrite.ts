import { StorageDriver } from "../StorageDriver";
import { CollectionMeta } from "./CollectionMeta";
import { CollectionOperator } from "./CollectionOperator";
import { Entry } from "./Entry";
import { WriteObserverBridge } from "./WriteObserverBridge";
import { WriteOperation } from "./type";

export class CollectionWrite<
  PrimaryKey extends string,
  E extends Entry<PrimaryKey>,
> extends CollectionOperator<PrimaryKey> {
  private readonly writeObserverBridge: WriteObserverBridge<PrimaryKey, E>;

  constructor(
    meta: CollectionMeta<PrimaryKey>,
    driver: StorageDriver,
    writeObserverBridge: WriteObserverBridge<PrimaryKey, E>,
  ) {
    super(meta, driver);

    this.writeObserverBridge = writeObserverBridge;
  }

  public async put(entry: E): Promise<void> {
    await this.driver.putEntries<PrimaryKey, E>(this.meta, [entry]);
    const key = entry[this.meta.primaryKey];
    this.writeObserverBridge.onWrite(WriteOperation.PUT, [key]);
  }

  public async putMultiple(entries: E[]): Promise<void> {
    await this.driver.putEntries<PrimaryKey, E>(this.meta, entries);
    this.writeObserverBridge.onWrite(
      WriteOperation.PUT,
      entries.map((entry) => entry[this.meta.primaryKey]),
    );
  }

  public async delete(key: E[PrimaryKey]): Promise<void> {
    await this.driver.deleteEntries<PrimaryKey, E>(this.meta, [key]);
    this.writeObserverBridge.onWrite(WriteOperation.DELETE, [key]);
  }

  public async deleteMultiple(keys: E[PrimaryKey][]): Promise<void> {
    await this.driver.deleteEntries<PrimaryKey, E>(this.meta, keys);
    this.writeObserverBridge.onWrite(WriteOperation.DELETE, keys);
  }
}
