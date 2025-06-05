import { CollectionMeta } from "./CollectionMeta";
import { CollectionRead } from "./CollectionRead";
import { Entry } from "./Entry";

type UserEntry = Entry<
  "id",
  "membership",
  {
    id: string;
    membership: "join" | "leave" | "invite" | "ban";
    name: string | undefined;
  }
>;

const mockDriver = {
  getEntries: jest.fn(),
  putEntries: jest.fn(),
  deleteEntries: jest.fn(),
  queryEntries: jest.fn(),
  queryIndexEntries: jest.fn(),
  queryKeys: jest.fn(),
  queryIndexKeys: jest.fn(),
};

describe("CollectionRead", () => {
  let read: CollectionRead<"id", "membership", UserEntry>;
  const meta = new CollectionMeta<"id">("users", "id");

  beforeEach(() => {
    read = new CollectionRead(meta, mockDriver);

    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should return a single entry when key exists", async () => {
      const key = "__username__";
      const mockEntry: UserEntry = {
        id: key,
        membership: "join",
        name: undefined,
      };
      mockDriver.getEntries.mockResolvedValueOnce([mockEntry]);

      const user = await read.get(key);

      expect(user).toEqual(mockEntry);
      expect(mockDriver.getEntries).toHaveBeenCalledWith(meta, [key]);
    });

    it("should return undefined if key doesn't exist", async () => {
      const key = "__username__";
      mockDriver.getEntries.mockResolvedValueOnce([]);

      const user = await read.get(key);

      expect(user).toEqual(undefined);
      expect(mockDriver.getEntries).toHaveBeenCalledWith(meta, [key]);
    });
  });

  describe("getMultiple", () => {
    it("should return multiple entry when keys exist", async () => {
      const keys = ["u1", "u2"];
      const mockEntry1: UserEntry = {
        id: "u1",
        membership: "join",
        name: undefined,
      };
      const mockEntry2: UserEntry = {
        id: "u2",
        membership: "join",
        name: undefined,
      };
      mockDriver.getEntries.mockResolvedValueOnce([mockEntry1, mockEntry2]);

      const users = await read.getMultiple(keys);

      expect(users).toEqual([mockEntry1, mockEntry2]);
      expect(mockDriver.getEntries).toHaveBeenCalledWith(meta, keys);
    });
    it("should return empty array when keys doesn't exist", async () => {
      const keys = ["u1", "u2"];
      mockDriver.getEntries.mockResolvedValueOnce([]);

      const users = await read.getMultiple(keys);

      expect(users).toEqual([]);
      expect(mockDriver.getEntries).toHaveBeenCalledWith(meta, keys);
    });
  });

  describe("query", () => {
    it("should return entries when match found", async () => {
      const query = "u1";
      const mockEntry: UserEntry = {
        id: "u1",
        membership: "join",
        name: undefined,
      };
      mockDriver.queryEntries.mockResolvedValueOnce([mockEntry]);

      const users = await read.query(query);

      expect(users).toEqual([mockEntry]);
      expect(mockDriver.queryEntries).toHaveBeenCalledWith(
        meta,
        query,
        undefined,
      );
    });
    it("should return an empty array when no entries match", async () => {
      const query = "u1";
      mockDriver.queryEntries.mockResolvedValueOnce([]);

      const result = await read.query(query);

      expect(result).toEqual([]);
      expect(mockDriver.queryEntries).toHaveBeenCalledWith(
        meta,
        query,
        undefined,
      );
    });
  });

  describe("queryIndex", () => {
    it("should return entries matching the indexed query", async () => {
      const indexKey = "membership";
      const query = "join";
      const mockEntries: UserEntry[] = [
        { id: "u1", name: "John Doe", membership: "join" },
      ];
      mockDriver.queryIndexEntries.mockResolvedValueOnce(mockEntries);

      const result = await read.queryIndex(indexKey, query);

      expect(result).toEqual(mockEntries);
      expect(mockDriver.queryIndexEntries).toHaveBeenCalledWith(
        meta,
        indexKey,
        query,
        undefined,
      );
    });

    it("should return an empty array when no entries match the indexed query", async () => {
      const indexKey = "membership";
      const query = "join";
      mockDriver.queryIndexEntries.mockResolvedValueOnce([]);

      const result = await read.queryIndex(indexKey, query);

      expect(result).toEqual([]);
      expect(mockDriver.queryIndexEntries).toHaveBeenCalledWith(
        meta,
        indexKey,
        query,
        undefined,
      );
    });
  });
});
