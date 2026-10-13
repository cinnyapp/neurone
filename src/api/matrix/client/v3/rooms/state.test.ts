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

import { getState, getStateEvent, putStateEvent } from "./state";

test("get room state request", () => {
  const roomId = "!roomId:server.name";

  expect(getState({ pathParams: { roomId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state`,
    requireAuthentication: true,
  });
});

test("get room state event request", () => {
  const roomId = "!roomId:server.name";
  const eventType = "my.evt.type";
  const stateKey = "my_key";

  expect(
    getStateEvent({ pathParams: { roomId, eventType, stateKey } }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/${encodeURIComponent(eventType)}/${encodeURIComponent(stateKey)}`,
    requireAuthentication: true,
  });
});

test("put room state event request", () => {
  const roomId = "!roomId:server.name";
  const eventType = "my.evt.type";
  const stateKey = "my_key";

  const body = { name: "xyz" };

  expect(
    putStateEvent({ pathParams: { roomId, eventType, stateKey }, body }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/${encodeURIComponent(eventType)}/${encodeURIComponent(stateKey)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
