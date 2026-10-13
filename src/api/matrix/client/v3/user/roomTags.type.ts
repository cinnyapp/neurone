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
import { RoomTagContent } from "../../../../types";

/**
 * getRoomTags types
 */
export type GetRoomTagsPathParams = {
  userId: string;
  roomId: string;
};

export type GetRoomTagsOK = {
  tags: Record<string, RoomTagContent>;
};

export type GetRoomTagsEndpoint = MatrixEndpoint<{
  pathParams: GetRoomTagsPathParams;
}>;

/**
 * putRoomTag types
 */
export type PutRoomTagPathParams = {
  userId: string;
  roomId: string;
  tag: string;
};

export type PutRoomTagBody = RoomTagContent;

export type PutRoomTagOK = Record<string, never>;

export type PutRoomTagEndpoint = MatrixEndpoint<{
  pathParams: PutRoomTagPathParams;
  body: PutRoomTagBody;
}>;

/**
 * deleteRoomTag types
 */
export type DeleteRoomTagPathParams = {
  userId: string;
  roomId: string;
  tag: string;
};

export type DeleteRoomTagOK = Record<string, never>;

export type DeleteRoomTagEndpoint = MatrixEndpoint<{
  pathParams: DeleteRoomTagPathParams;
}>;
