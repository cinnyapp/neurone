/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
  getAllEntries: jest.fn(),
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

  describe("getAll", () => {
    it("should return all entries", async () => {
      const mockEntries: UserEntry[] = [
        { id: "u1", membership: "join", name: "John" },
        { id: "u2", membership: "invite", name: undefined },
      ];

      mockDriver.getAllEntries.mockResolvedValueOnce(mockEntries);

      const result = await read.getAll();

      expect(result).toEqual(mockEntries);
      expect(mockDriver.getAllEntries).toHaveBeenCalledWith(meta);
    });

    it("should return an empty array when no entries exist", async () => {
      mockDriver.getAllEntries.mockResolvedValueOnce([]);

      const result = await read.getAll();

      expect(result).toEqual([]);
      expect(mockDriver.getAllEntries).toHaveBeenCalledWith(meta);
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

  describe("queryKeys", () => {
    it("should return keys when match found", async () => {
      const query = "u1";
      const mockKeys = ["u1"];
      mockDriver.queryKeys.mockResolvedValueOnce(mockKeys);

      const userKeys = await read.queryKeys(query);

      expect(userKeys).toEqual(mockKeys);
      expect(mockDriver.queryKeys).toHaveBeenCalledWith(meta, query, undefined);
    });
    it("should return an empty array when no entries match", async () => {
      const query = "u1";
      mockDriver.queryKeys.mockResolvedValueOnce([]);

      const result = await read.queryKeys(query);

      expect(result).toEqual([]);
      expect(mockDriver.queryKeys).toHaveBeenCalledWith(meta, query, undefined);
    });
  });

  describe("queryIndexKeys", () => {
    it("should return keys matching the indexed query", async () => {
      const indexKey = "membership";
      const query = "join";
      const mockKeys = ["u1"];
      mockDriver.queryIndexKeys.mockResolvedValueOnce(mockKeys);

      const result = await read.queryIndexKeys(indexKey, query);

      expect(result).toEqual(mockKeys);
      expect(mockDriver.queryIndexKeys).toHaveBeenCalledWith(
        meta,
        indexKey,
        query,
        undefined,
      );
    });

    it("should return an empty array when no entries match the indexed query", async () => {
      const indexKey = "membership";
      const query = "join";
      mockDriver.queryIndexKeys.mockResolvedValueOnce([]);

      const result = await read.queryIndexKeys(indexKey, query);

      expect(result).toEqual([]);
      expect(mockDriver.queryIndexKeys).toHaveBeenCalledWith(
        meta,
        indexKey,
        query,
        undefined,
      );
    });
  });
});
