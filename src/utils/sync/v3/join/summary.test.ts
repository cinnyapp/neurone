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

import { JoinRoom } from "../../../../api/matrix/client/v3/sync";
import { RoomSummary } from "../../../../api/types";
import { roomSummary } from "./summary";

test("get room summary from sync response", () => {
  const summary: RoomSummary = {
    "m.joined_member_count": 2,
    "m.invited_member_count": 1,
  };

  const joinRoom: JoinRoom = {
    summary,
  };

  expect(roomSummary(joinRoom)).toEqual(summary);

  expect(roomSummary({})).toBe(undefined);

  expect(
    roomSummary({
      summary: {},
    }),
  ).toBe(undefined);
});
