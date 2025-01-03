export class CollectionMeta<PrimaryKey extends string> {
  public readonly name: string;

  public readonly primaryKey: PrimaryKey;

  constructor(name: string, primaryKey: PrimaryKey) {
    this.name = name;
    this.primaryKey = primaryKey;
  }
}
