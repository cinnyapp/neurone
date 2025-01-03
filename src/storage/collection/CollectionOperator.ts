import { StorageDriver } from "../StorageDriver";
import { CollectionMeta } from "./CollectionMeta";

export class CollectionOperator<PrimaryKey extends string> {
  protected readonly meta: CollectionMeta<PrimaryKey>;
  protected readonly driver: StorageDriver;

  constructor(meta: CollectionMeta<PrimaryKey>, driver: StorageDriver) {
    this.meta = meta;
    this.driver = driver;
  }
}
