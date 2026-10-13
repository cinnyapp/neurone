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

import { AccountDataEvent } from "../../../../api/types";
import { LeaveRoom } from "../../../../api/matrix/client/v3/sync/sync.type";
import { roomAccountData } from "./accountData";

test("get leave room account data event", () => {
  const events: AccountDataEvent[] = [
    {
      content: {
        some: "value",
      },
      type: "personal",
    },
    {
      content: {
        some: "value",
      },
      type: "fav",
    },
  ];

  const leaveRoom: LeaveRoom = {
    account_data: {
      events,
    },
  };

  expect(roomAccountData(leaveRoom)).toEqual(events);
  expect(roomAccountData(leaveRoom)).not.toEqual([]);
});

test("get leave room account data event with no events", () => {
  const events: AccountDataEvent[] = [];

  const leaveRoom: LeaveRoom = {
    account_data: {
      events,
    },
  };

  expect(roomAccountData(leaveRoom).length).toEqual(0);
});
