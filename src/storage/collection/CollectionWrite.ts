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
    await this.driver.putEnteries<PrimaryKey, E>(this.meta, [entry]);
    const key = entry[this.meta.primaryKey];
    this.writeObserverBridge.onWrite(WriteOperation.PUT, [key]);
  }

  public async putMultiple(enteries: E[]): Promise<void> {
    await this.driver.putEnteries<PrimaryKey, E>(this.meta, enteries);
    this.writeObserverBridge.onWrite(
      WriteOperation.PUT,
      enteries.map((entry) => entry[this.meta.primaryKey]),
    );
  }

  public async delete(key: E[PrimaryKey]): Promise<void> {
    await this.driver.deleteEnteries<PrimaryKey, E>(this.meta, [key]);
    this.writeObserverBridge.onWrite(WriteOperation.DELETE, [key]);
  }

  public async deleteMultiple(keys: E[PrimaryKey][]): Promise<void> {
    await this.driver.deleteEnteries<PrimaryKey, E>(this.meta, keys);
    this.writeObserverBridge.onWrite(WriteOperation.DELETE, keys);
  }
}
