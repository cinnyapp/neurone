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

import { StorageDriver } from "../StorageDriver";
import { CollectionMeta } from "./CollectionMeta";
import { CollectionOperator } from "./CollectionOperator";
import { Entry, Indexes } from "./Entry";
import { WriteObserverBridge } from "./WriteObserverBridge";

export class CollectionWrite<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> extends CollectionOperator<PrimaryKey> {
  private readonly writeObserverBridge: WriteObserverBridge<
    PrimaryKey,
    IndexKeys,
    E
  >;

  constructor(
    meta: CollectionMeta<PrimaryKey>,
    driver: StorageDriver,
    writeObserverBridge: WriteObserverBridge<PrimaryKey, IndexKeys, E>,
  ) {
    super(meta, driver);

    this.writeObserverBridge = writeObserverBridge;
  }

  public async put(entry: E): Promise<void> {
    const entries = [entry];
    await this.driver.putEntries<PrimaryKey, E>(this.meta, entries);
    this.writeObserverBridge.onPut(entries);
  }

  public async putMultiple(entries: E[]): Promise<void> {
    if (entries.length === 0) return;

    await this.driver.putEntries<PrimaryKey, E>(this.meta, entries);
    this.writeObserverBridge.onPut(entries);
  }

  public async delete(key: E[PrimaryKey]): Promise<void> {
    const keys = [key];
    await this.driver.deleteEntries<PrimaryKey, E>(this.meta, keys);
    this.writeObserverBridge.onDelete(keys);
  }

  public async deleteMultiple(keys: E[PrimaryKey][]): Promise<void> {
    if (keys.length === 0) return;

    await this.driver.deleteEntries<PrimaryKey, E>(this.meta, keys);
    this.writeObserverBridge.onDelete(keys);
  }
}
