import { StorageDriver } from "../StorageDriver";
import { CollectionMeta } from "./CollectionMeta";
import { CollectionObservableRead } from "./CollectionObservableRead";
import { CollectionRead } from "./CollectionRead";
import { CollectionWrite } from "./CollectionWrite";
import { Entry, Indexes } from "./Entry";
import { WriteObserverBridge } from "./WriteObserverBridge";

export class Collection<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> {
  public readonly meta: CollectionMeta<PrimaryKey>;

  private readonly writeObserverBridge: WriteObserverBridge<
    PrimaryKey,
    IndexKeys,
    E
  >;

  public readonly read: CollectionRead<PrimaryKey, IndexKeys, E>;

  public readonly observableRead: CollectionObservableRead<
    PrimaryKey,
    IndexKeys,
    E
  >;

  public readonly write: CollectionWrite<PrimaryKey, IndexKeys, E>;

  constructor(name: string, primaryKey: PrimaryKey, driver: StorageDriver) {
    this.meta = new CollectionMeta(name, primaryKey);

    this.writeObserverBridge = new WriteObserverBridge();
    this.read = new CollectionRead(this.meta, driver);
    this.observableRead = new CollectionObservableRead(
      this.meta,
      this.read,
      this.writeObserverBridge,
    );
    this.write = new CollectionWrite(
      this.meta,
      driver,
      this.writeObserverBridge,
    );
  }
}
