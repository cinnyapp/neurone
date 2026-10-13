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

import { CollectionWrite } from "./CollectionWrite";
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
  getAllEntries: jest.fn(),
  putEntries: jest.fn(),
  deleteEntries: jest.fn(),
  queryEntries: jest.fn(),
  queryIndexEntries: jest.fn(),
  queryKeys: jest.fn(),
  queryIndexKeys: jest.fn(),
};

const mockWriteObserverBridge = {
  onPut: jest.fn(),
  onDelete: jest.fn(),
  observe: jest.fn(),
};

describe("CollectionWrite", () => {
  let collectionWrite: CollectionWrite<"id", never, UserEntry>;
  const mockMeta = new CollectionMeta<"id">("users", "id");

  beforeEach(() => {
    collectionWrite = new CollectionWrite<"id", never, UserEntry>(
      mockMeta,
      mockDriver,
      mockWriteObserverBridge as unknown as WriteObserverBridge<
        "id",
        never,
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
    expect(mockWriteObserverBridge.onPut).toHaveBeenCalledWith([entry]);
  });

  it("should put multiple entries", async () => {
    const entries: UserEntry[] = [
      { id: "1", name: "Test 1" },
      { id: "2", name: "Test 2" },
    ];

    await collectionWrite.putMultiple(entries);

    expect(mockDriver.putEntries).toHaveBeenCalledWith(mockMeta, entries);
    expect(mockWriteObserverBridge.onPut).toHaveBeenCalledWith(entries);
  });

  it("should delete a single entry", async () => {
    const key = "1";

    await collectionWrite.delete(key);

    expect(mockDriver.deleteEntries).toHaveBeenCalledWith(mockMeta, [key]);
    expect(mockWriteObserverBridge.onDelete).toHaveBeenCalledWith([key]);
  });

  it("should delete multiple entries", async () => {
    const keys = ["1", "2"];

    await collectionWrite.deleteMultiple(keys);

    expect(mockDriver.deleteEntries).toHaveBeenCalledWith(mockMeta, keys);
    expect(mockWriteObserverBridge.onDelete).toHaveBeenCalledWith(keys);
  });
});
