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

import { CollectionOperator } from "./CollectionOperator";
import { Entry, Indexes } from "./Entry";
import { QueryCursor, Query } from "./type";

export class CollectionRead<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  E extends Entry<PrimaryKey, IndexKeys> = Entry<PrimaryKey, Indexes>,
> extends CollectionOperator<PrimaryKey> {
  public async get(key: E[PrimaryKey]): Promise<E | undefined> {
    const [entry] = await this.driver.getEntries<PrimaryKey, E>(this.meta, [
      key,
    ]);

    return entry;
  }

  public async getAll(): Promise<E[]> {
    const entries = await this.driver.getAllEntries<PrimaryKey, E>(this.meta);
    return entries;
  }

  public async getMultiple(
    keys: E[PrimaryKey][],
  ): Promise<Array<E | undefined>> {
    const entries = await this.driver.getEntries<PrimaryKey, E>(
      this.meta,
      keys,
    );

    return entries;
  }

  public async query(
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<E[]> {
    const entries = await this.driver.queryEntries<PrimaryKey, E>(
      this.meta,
      query,
      cursor,
    );

    return entries;
  }

  public async queryIndex<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<E[]> {
    const entries = await this.driver.queryIndexEntries<IndexKey, E>(
      this.meta,
      indexKey,
      query,
      cursor,
    );

    return entries;
  }

  public async queryKeys(
    query: Query<E[PrimaryKey]>,
    cursor?: QueryCursor,
  ): Promise<E[PrimaryKey][]> {
    const keys = await this.driver.queryKeys<PrimaryKey, E>(
      this.meta,
      query,
      cursor,
    );

    return keys;
  }

  public async queryIndexKeys<IndexKey extends IndexKeys>(
    indexKey: IndexKey,
    query: Query<E[IndexKey]>,
    cursor?: QueryCursor,
  ): Promise<E[PrimaryKey][]> {
    const keys = await this.driver.queryIndexKeys<PrimaryKey, IndexKey, E>(
      this.meta,
      indexKey,
      query,
      cursor,
    );

    return keys;
  }
}
