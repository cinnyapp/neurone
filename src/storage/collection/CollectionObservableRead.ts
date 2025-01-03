import { CollectionRead } from "./CollectionRead";
import { Entry, Indexes } from "./Entry";
import { WriteObserverBridge } from "./WriteObserverBridge";
import { WriteObserverCallback, WriteOperation } from "./type";

export class CollectionObservableRead<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> {
  private readonly read: CollectionRead<PrimaryKey, IndexKeys, E>;
  private readonly writeObserverBridge: WriteObserverBridge<PrimaryKey, E>;

  constructor(
    read: CollectionRead<PrimaryKey, IndexKeys, E>,
    writeObserverBridge: WriteObserverBridge<PrimaryKey, E>,
  ) {
    this.read = read;
    this.writeObserverBridge = writeObserverBridge;
  }

  public get(
    key: E[PrimaryKey],
    observer: (entry: E | undefined) => void,
  ): () => void {
    this.read.get(key).then((entry) => observer(entry));

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = (
      operation,
      data,
    ) => {
      if (operation === WriteOperation.PUT) {
        data.find((entry) => entry);
        this.read.get(key).then((entry) => observer(entry));
        return;
      }
      if (operation === WriteOperation.DELETE) {
        observer(undefined);
        return;
      }
    };

    return this.writeObserverBridge.observe(writeObserver);
  }

  public getMultiple(
    keys: E[PrimaryKey][],
    observer: (enteries: E[]) => void,
  ): () => void {
    this.read.getMultiple(keys).then((enteries) => observer(enteries));

    const writeObserver: WriteObserverCallback<PrimaryKey, E> = (
      operation,
      updateKeys,
    ) => {
      const hasUpdate = updateKeys.some((k) => keys.includes(k));
      if (!hasUpdate) return;

      if (operation === WriteOperation.PUT) {
        this.read.getMultiple(keys).then((enteries) => observer(enteries));
        return;
      }
      if (operation === WriteOperation.DELETE) {
        const remaningKeys = keys.filter((k) => updateKeys.includes(k));
        this.read
          .getMultiple(remaningKeys)
          .then((enteries) => observer(enteries));
        return;
      }
    };

    return this.writeObserverBridge.observe(writeObserver);
  }
}
