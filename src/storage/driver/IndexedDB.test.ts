import { openDB, deleteDB } from "idb";
import { IDBPDatabase } from "idb";
import { IndexedDBStorageDriver } from "./IndexedDB";
import { Entry, CollectionMeta, QueryRange } from "../collection";
import "fake-indexeddb/auto";

const PRIMARY_KEY = "id";

type UserEntry = Entry<
  typeof PRIMARY_KEY,
  "age",
  {
    id: number;
    name: string;
    age: number;
  }
>;

const collectionMeta: CollectionMeta<typeof PRIMARY_KEY> = {
  name: "users",
  primaryKey: PRIMARY_KEY,
};

let db: IDBPDatabase;
let driver: IndexedDBStorageDriver;

beforeEach(async () => {
  db = await openDB("TestDB", 1, {
    upgrade(db) {
      const store = db.createObjectStore("users", {
        keyPath: PRIMARY_KEY,
      });
      store.createIndex("age", "age");
    },
  });

  driver = new IndexedDBStorageDriver(db as unknown as IDBDatabase);
});

afterEach(async () => {
  db.close();
  await deleteDB("TestDB");
});

describe("IndexedDBStorageDriver", () => {
  const users: UserEntry[] = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 },
  ];

  it("should store and retrieve entries", async () => {
    await driver.putEntries(collectionMeta, users);

    const result = await driver.getEntries<typeof PRIMARY_KEY, UserEntry>(
      collectionMeta,
      [1, 2],
    );
    expect(result.length).toBe(2);
    expect(result[0]?.name).toBe("Alice");
    expect(result[1]?.name).toBe("Bob");
  });

  it("should delete entries", async () => {
    await driver.putEntries(collectionMeta, users);
    await driver.deleteEntries(collectionMeta, [1]);

    const result = await driver.getEntries(collectionMeta, [1, 2]);
    expect(result.length).toBe(2);
    expect(result[0]).toBe(undefined);
    expect(result[1]?.id).toBe(2);
  });

  it("should query entries with a range", async () => {
    await driver.putEntries(collectionMeta, users);

    const result = await driver.queryEntries<typeof PRIMARY_KEY, UserEntry>(
      collectionMeta,
      new QueryRange<number>(1, 2), // IDs from 1 to 2
      { dir: "Next", limit: 10, unique: false },
    );

    expect(result.length).toBe(2);
    expect(result.map((r) => r.id)).toEqual([1, 2]);
  });

  it("should query index entries", async () => {
    await driver.putEntries(collectionMeta, users);

    const result = await driver.queryIndexEntries<
      typeof PRIMARY_KEY,
      "age",
      UserEntry
    >(collectionMeta, "age", new QueryRange<number>(25, 30), {
      dir: "Next",
      limit: 10,
      unique: false,
    });

    expect(result.length).toBe(2);
    expect(result.map((r) => r.name)).toContain("Alice");
    expect(result.map((r) => r.name)).toContain("Bob");
  });

  it("should query keys", async () => {
    await driver.putEntries(collectionMeta, users);

    const keys = await driver.queryKeys<typeof PRIMARY_KEY, UserEntry>(
      collectionMeta,
      new QueryRange<number>(1),
      { dir: "Next", limit: 10, unique: false },
    );

    expect(keys).toEqual([1, 2, 3]);
  });

  it("should query index keys", async () => {
    await driver.putEntries(collectionMeta, users);

    const keys = await driver.queryIndexKeys<
      typeof PRIMARY_KEY,
      "age",
      UserEntry
    >(collectionMeta, "age", new QueryRange<number>(30, 35), {
      dir: "Next",
      limit: 10,
      unique: false,
    });

    expect(keys.length).toBe(2);
  });
});
