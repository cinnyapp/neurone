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
import { PublicRoomsChunk, PublicRoomsFilter } from "../../../../types";

/**
 * getPublicRooms types
 */
export type GetPublicRoomsSearchParams = {
  limit?: number;
  server?: string;
  since?: string;
};
export type GetPublicRoomsOK = {
  chunk: PublicRoomsChunk[];
  next_batch?: string;
  prev_batch?: string;
  total_room_count_estimate?: number;
};
export type GetPublicRoomsEndpoint = MatrixEndpoint<{
  searchParams?: GetPublicRoomsSearchParams;
}>;

/**
 * postPublicRooms types
 */
export type PostPublicRoomsSearchParams = {
  server?: string;
};
export type PostPublicRoomsBody = {
  filter?: PublicRoomsFilter;
  include_all_networks?: boolean;
  limit?: number;
  since?: string;
  third_party_instance_id?: string;
};
export type PostPublicRoomsOK = {
  chunk: PublicRoomsChunk[];
  next_batch?: string;
  prev_batch?: string;
  total_room_count_estimate?: number;
};
export type PostPublicRoomsEndpoint = MatrixEndpoint<{
  searchParams?: PostPublicRoomsSearchParams;
  body?: PostPublicRoomsBody;
}>;
