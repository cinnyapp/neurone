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

import { LeaveRoom, Timeline } from "../../../../api/matrix/client/v3/sync";
import { ClientEventWithoutRoomId } from "../../../../api/types";
import { roomTimeline } from "./timeline";

test("get leave room timeline from sync response", () => {
  const timelineEventsWithoutRoomId: ClientEventWithoutRoomId[] = [
    {
      content: {
        avatar_url: "mxc://example.org/SEsfnsuifSDFSSEF",
        displayname: "Alice Margatroid",
        membership: "join",
        reason: "Looking for support",
      },
      event_id: "$143273582443PhrSn:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      state_key: "@alice:example.org",
      type: "m.room.member",
      unsigned: {
        age: 1234,
      },
    },
    {
      content: {
        body: "This is an example text message",
        format: "org.matrix.custom.html",
        formatted_body: "<b>This is an example text message</b>",
        msgtype: "m.text",
      },
      event_id: "$143273582443PhrSn:example.org",
      origin_server_ts: 1432735824653,
      sender: "@example:example.org",
      type: "m.room.message",
      unsigned: {
        age: 1234,
      },
    },
  ];

  const timeline: Timeline = {
    events: timelineEventsWithoutRoomId,
  };

  const joinRoom: LeaveRoom = {
    timeline,
  };

  expect(roomTimeline(joinRoom)).toEqual(timelineEventsWithoutRoomId);

  expect(roomTimeline({})).toEqual([]);
});
