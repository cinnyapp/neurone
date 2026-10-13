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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionObservableRead } from "./CollectionObservableRead";
import { CollectionMeta } from "./CollectionMeta";
import { Entry } from "./Entry";
import { WriteObserver } from "./type";

type UserEntry = Entry<
  "id",
  "membership",
  {
    id: string;
    membership: "join" | "leave";
    name?: string;
  }
>;

describe("CollectionObservableRead", () => {
  const meta = new CollectionMeta<"id">("users", "id");

  let mockRead: any;
  let observers: WriteObserver<"id", "membership", UserEntry>[];

  let writeObserverBridge: any;
  let collection: CollectionObservableRead<"id", "membership", UserEntry>;

  beforeEach(() => {
    observers = [];

    mockRead = {
      get: jest.fn(),
      getAll: jest.fn(),
      getMultiple: jest.fn(),
      query: jest.fn(),
      queryIndex: jest.fn(),
      queryKeys: jest.fn(),
      queryIndexKeys: jest.fn(),
    };

    writeObserverBridge = {
      observe: jest.fn((observer) => {
        observers.push(observer);
        return () => {
          observers = observers.filter((o) => o !== observer);
        };
      }),
    };

    collection = new CollectionObservableRead(
      meta,
      mockRead,
      writeObserverBridge,
    );
  });

  describe("get", () => {
    it("publishes updates on put and delete", async () => {
      const entry: UserEntry = {
        id: "1",
        membership: "join",
      };

      mockRead.get.mockResolvedValueOnce(entry);

      const observable = await collection.get("1");

      expect(observable.read).toEqual(entry);
      expect(writeObserverBridge.observe).toHaveBeenCalledTimes(1);

      // simulate PUT
      const updated: UserEntry = {
        id: "1",
        membership: "leave",
      };

      observers[0].onPut([updated]);
      expect(observable.read).toEqual(updated);

      // simulate DELETE
      observers[0].onDelete(["1"]);
      expect(observable.read).toBeUndefined();
    });

    it("disconnects observer on dispose", async () => {
      mockRead.get.mockResolvedValueOnce(undefined);

      const observable = await collection.get("1");

      expect(observers.length).toBe(1);

      observable.dispose();

      expect(observers.length).toBe(0);
    });
  });

  describe("getAll", () => {
    it("updates entries on put and delete", async () => {
      const initial: UserEntry[] = [
        { id: "1", membership: "join" },
        { id: "2", membership: "leave" },
      ];

      mockRead.getAll.mockResolvedValueOnce(initial);

      const observable = await collection.getAll();

      expect(observable.read).toEqual(initial);

      // PUT replaces existing + adds new
      const updated: UserEntry[] = [
        { id: "2", membership: "join" },
        { id: "3", membership: "join" },
      ];

      observers[0].onPut(updated);

      expect(observable.read).toEqual([
        { id: "1", membership: "join" },
        { id: "2", membership: "join" },
        { id: "3", membership: "join" },
      ]);

      // DELETE removes matching keys
      observers[0].onDelete(["1", "3"]);

      expect(observable.read).toEqual([{ id: "2", membership: "join" }]);
    });
  });

  describe("getMultiple", () => {
    it("returns entries in key order and updates on put", async () => {
      const keys = ["1", "2", "3"];

      const initial: Array<UserEntry | undefined> = [
        { id: "1", membership: "join" },
        undefined,
        { id: "3", membership: "leave" },
      ];

      mockRead.getMultiple.mockResolvedValueOnce(initial);

      const observable = await collection.getMultiple(keys);

      expect(observable.read).toEqual(initial);
      expect(writeObserverBridge.observe).toHaveBeenCalledTimes(1);

      // PUT updates only matching keys, preserving order
      const updated: UserEntry[] = [
        { id: "2", membership: "join" },
        { id: "3", membership: "join" },
      ];

      observers[0].onPut(updated);

      expect(observable.read).toEqual([
        { id: "1", membership: "join" },
        { id: "2", membership: "join" },
        { id: "3", membership: "join" },
      ]);
    });

    it("sets entries to undefined on delete", async () => {
      const keys = ["1", "2"];

      const initial: Array<UserEntry | undefined> = [
        { id: "1", membership: "join" },
        { id: "2", membership: "leave" },
      ];

      mockRead.getMultiple.mockResolvedValueOnce(initial);

      const observable = await collection.getMultiple(keys);

      // DELETE one key
      observers[0].onDelete(["1"]);

      expect(observable.read).toEqual([
        undefined,
        { id: "2", membership: "leave" },
      ]);

      // DELETE remaining key
      observers[0].onDelete(["2"]);

      expect(observable.read).toEqual([undefined, undefined]);
    });

    it("ignores put when none of the keys are affected", async () => {
      const keys = ["1"];

      mockRead.getMultiple.mockResolvedValueOnce([
        { id: "1", membership: "join" },
      ]);

      const observable = await collection.getMultiple(keys);

      observers[0].onPut([{ id: "999", membership: "leave" }]);

      expect(observable.read).toEqual([{ id: "1", membership: "join" }]);
    });

    it("disconnects observer on dispose", async () => {
      mockRead.getMultiple.mockResolvedValueOnce([undefined]);

      const observable = await collection.getMultiple(["1"]);

      expect(observers.length).toBe(1);

      observable.dispose();

      expect(observers.length).toBe(0);
    });
  });
});
