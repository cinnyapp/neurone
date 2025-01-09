import { CollectionWrite } from "./CollectionWrite";
import { WriteOperation } from "./type";
import { CollectionMeta } from "./CollectionMeta";
import { Entry } from "./Entry";
import { WriteObserverBridge } from "./WriteObserverBridge";

type UserEntry = Entry<
  "id",
  never,
  {
    id: string;
    name: string | undefined;
  }
>;

const mockDriver = {
  getEntries: jest.fn(),
  putEntries: jest.fn(),
  deleteEntries: jest.fn(),
  queryEntries: jest.fn(),
  queryIndexEntries: jest.fn(),
};

const mockWriteObserverBridge = {
  onWrite: jest.fn(),
  observe: jest.fn(),
};

describe("CollectionWrite", () => {
  let collectionWrite: CollectionWrite<"id", UserEntry>;
  const mockMeta = new CollectionMeta<"id">("users", "id");

  beforeEach(() => {
    collectionWrite = new CollectionWrite<"id", UserEntry>(
      mockMeta,
      mockDriver,
      mockWriteObserverBridge as unknown as WriteObserverBridge<
        "id",
        UserEntry
      >,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should put a single entry", async () => {
    const entry: UserEntry = { id: "1", name: "Test" };

    await collectionWrite.put(entry);

    expect(mockDriver.putEntries).toHaveBeenCalledWith(mockMeta, [entry]);
    expect(mockWriteObserverBridge.onWrite).toHaveBeenCalledWith(
      WriteOperation.PUT,
      ["1"],
    );
  });

  it("should put multiple entries", async () => {
    const entries: UserEntry[] = [
      { id: "1", name: "Test 1" },
      { id: "2", name: "Test 2" },
    ];

    await collectionWrite.putMultiple(entries);

    expect(mockDriver.putEntries).toHaveBeenCalledWith(mockMeta, entries);
    expect(mockWriteObserverBridge.onWrite).toHaveBeenCalledWith(
      WriteOperation.PUT,
      ["1", "2"],
    );
  });

  it("should delete a single entry", async () => {
    const key = "1";

    await collectionWrite.delete(key);

    expect(mockDriver.deleteEntries).toHaveBeenCalledWith(mockMeta, [key]);
    expect(mockWriteObserverBridge.onWrite).toHaveBeenCalledWith(
      WriteOperation.DELETE,
      [key],
    );
  });

  it("should delete multiple entries", async () => {
    const keys = ["1", "2"];

    await collectionWrite.deleteMultiple(keys);

    expect(mockDriver.deleteEntries).toHaveBeenCalledWith(mockMeta, keys);
    expect(mockWriteObserverBridge.onWrite).toHaveBeenCalledWith(
      WriteOperation.DELETE,
      keys,
    );
  });
});
