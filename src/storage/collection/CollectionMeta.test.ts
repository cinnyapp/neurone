import { CollectionMeta } from "./CollectionMeta";

describe("CollectionMeta", () => {
  it("should correctly initialize the name and primaryKey", () => {
    const name = "users";
    const primaryKey = "id";

    const collectionMeta = new CollectionMeta(name, primaryKey);

    expect(collectionMeta.name).toBe(name);
    expect(collectionMeta.primaryKey).toBe(primaryKey);
  });
});
