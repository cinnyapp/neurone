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

import { putRedact } from "./redact";

test("put redact message with reason request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "$eventId:server.name";
  const txnId = "txn";

  const body = {
    reason: "xyz",
  };

  expect(putRedact({ pathParams: { roomId, eventId, txnId }, body })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/redact/${encodeURIComponent(eventId)}/${encodeURIComponent(txnId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("put redact message without reason body request", () => {
  const roomId = "!roomId:server.name";
  const eventId = "evt_type";
  const txnId = "txn";

  expect(putRedact({ pathParams: { roomId, eventId, txnId } })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/redact/${encodeURIComponent(eventId)}/${encodeURIComponent(txnId)}`,
    requireAuthentication: true,
    body: JSON.stringify({}),
  });
});
