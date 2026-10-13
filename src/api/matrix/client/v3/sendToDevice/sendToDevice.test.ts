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

import { putSendToDevice } from "./sendToDevice";

test("put send to device messages request", () => {
  const eventType = "some.type";
  const txnId = "someid";

  const body = {
    messages: {
      "!room:server.name": {
        DeviceId: {
          data: "some data",
        },
      },
    },
  };

  expect(putSendToDevice({ pathParams: { eventType, txnId }, body })).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/sendToDevice/${encodeURIComponent(eventType)}/${encodeURIComponent(txnId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
