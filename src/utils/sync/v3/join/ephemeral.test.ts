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

import { JoinRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import {
  roomEphemeral,
  roomReceiptEphemeral,
  roomTypingEphemeral,
} from "./ephemeral";

test("get room typing ephemeral events from sync data", () => {
  const events = [
    {
      type: "m.typing",
      content: {
        user_ids: ["@joe:server.name", "@john:server.name"],
      },
    },
  ];

  const joinRoom: JoinRoom = {
    ephemeral: {
      events,
    },
  };

  expect(roomTypingEphemeral(roomEphemeral(joinRoom))).toEqual(events[0]);

  expect(roomTypingEphemeral(roomEphemeral({}))).toEqual(undefined);
});

test("get room event receipt ephemeral events from sync data", () => {
  const events = [
    {
      type: "m.receipt",
      content: {
        "$evt1:server.name": {
          "m.read": {
            "@u1:server.name": {
              ts: 123,
            },
          },
        },
        "$evt2:server.name": {
          "m.read": {
            "@u1:server.name": {
              ts: 123,
            },
          },
          "m.read.private": {
            "@me:server.name": {
              ts: 124,
            },
          },
        },
      },
    },
  ];

  const joinRoom: JoinRoom = {
    ephemeral: {
      events: events,
    },
  };

  expect(roomReceiptEphemeral(roomEphemeral(joinRoom))).toEqual(events[0]);

  expect(roomReceiptEphemeral(roomEphemeral({}))).toEqual(undefined);
});
