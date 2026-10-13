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

import { getListRoom, putListRoom } from "./list";
import { PutListRoomBody } from "./list.type";

test("get list room visibility request", () => {
  const roomId = "!roomId:server.name";

  expect(getListRoom({ pathParams: { roomId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/directory/list/room/${encodeURIComponent(roomId)}`,
  });
});

test("put list room visibility request", () => {
  const roomId = "!roomId:server.name";
  const body: PutListRoomBody = {
    visibility: "public",
  };

  expect(putListRoom({ pathParams: { roomId }, body })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/directory/list/room/${encodeURIComponent(roomId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
