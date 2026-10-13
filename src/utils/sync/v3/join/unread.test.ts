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
import { UnreadNotificationCounts } from "../../../../api/types";
import {
  roomUnreadNotifications,
  roomUnreadThreadNotifications,
} from "./unread";

test("get room unread notifications from sync response", () => {
  const unreadCount: UnreadNotificationCounts = {
    highlight_count: 8,
    notification_count: 9,
  };

  const joinRoom: JoinRoom = {
    unread_notifications: unreadCount,
  };

  expect(roomUnreadNotifications(joinRoom)).toEqual(unreadCount);

  expect(roomUnreadNotifications({})).toBe(undefined);
});

test("get room unread thread notifications from sync response", () => {
  const unreadCount: UnreadNotificationCounts = {
    highlight_count: 8,
    notification_count: 9,
  };

  const roomToUnread = {
    "!abc:roomId": unreadCount,
  };

  const joinRoom: JoinRoom = {
    unread_thread_notifications: roomToUnread,
  };

  expect(roomUnreadThreadNotifications(joinRoom)).toEqual(roomToUnread);

  expect(roomUnreadThreadNotifications({})).toBe(undefined);
});
