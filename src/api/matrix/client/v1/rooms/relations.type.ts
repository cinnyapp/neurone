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

import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ClientEvent } from "../../../../types";

/**
 * getRelations types
 */
export type GetRelationsPathParams = {
  roomId: string;
  eventId: string;
};

export type GetRelationsSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: number;
  recurse?: boolean;
  to?: string;
};

export type GetRelationsOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};

export type GetRelationsEndpoint = MatrixEndpoint<{
  pathParams: GetRelationsPathParams;
  searchParams?: GetRelationsSearchParams;
}>;

/**
 * getRelationsRelType types
 */
export type GetRelationsRelTypePathParams = {
  roomId: string;
  eventId: string;
  relType: string;
};

export type GetRelationsRelTypeSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: number;
  recurse?: boolean;
  to?: string;
};

export type GetRelationsRelTypeOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};

export type GetRelationsRelEndpoint = MatrixEndpoint<{
  pathParams: GetRelationsRelTypePathParams;
  searchParams?: GetRelationsRelTypeSearchParams;
}>;

/**
 * getRelationsRelTypeEventType types
 */
export type GetRelationsRelTypeEventTypePathParams = {
  roomId: string;
  eventId: string;
  relType: string;
  eventType: string;
};

export type GetRelationsRelTypeEventTypeSearchParams = {
  dir?: "b" | "f";
  from?: string;
  limit?: number;
  recurse?: boolean;
  to?: string;
};

export type GetRelationsRelTypeEventTypeOK = {
  chunk: ClientEvent[];
  next_batch?: string;
  prev_batch?: string;
};

export type GetRelationsRelTypeEndpoint = MatrixEndpoint<{
  pathParams: GetRelationsRelTypeEventTypePathParams;
  searchParams?: GetRelationsRelTypeEventTypeSearchParams;
}>;
