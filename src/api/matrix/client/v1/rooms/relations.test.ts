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

import {
  getRelations,
  getRelationsRelType,
  getRelationsRelTypeEventType,
} from "./relations";

test("get relations message request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";

  expect(
    getRelations({
      pathParams: { roomId, eventId },
      searchParams: {
        dir: "b",
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}?dir=b`,
    requireAuthentication: true,
  });
});

test("get relations message request without search params", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";

  expect(getRelations({ pathParams: { roomId, eventId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}`,
    requireAuthentication: true,
  });
});

test("get relations with rel type message request without search params", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";
  const relType = "m.thread";

  expect(
    getRelationsRelType({ pathParams: { roomId, eventId, relType } }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}/${encodeURIComponent(relType)}`,
    requireAuthentication: true,
  });
});

test("get relations with rel type and event type message request without search params", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";
  const relType = "some.relation";
  const eventType = "some.event_type";

  expect(
    getRelationsRelTypeEventType({
      pathParams: { roomId, eventId, relType, eventType },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}/${encodeURIComponent(relType)}/${eventType}`,
    requireAuthentication: true,
  });
});
