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

import { getSync } from "./sync";

test("sync request with no search params", () => {
  const syncRequest = getSync({});

  expect(syncRequest).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/sync",
    requireAuthentication: true,
  });
});

test("sync request with single search params", () => {
  const syncRequest = getSync({
    searchParams: {
      set_presence: "offline",
    },
  });

  expect(syncRequest).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/sync?set_presence=offline",
    requireAuthentication: true,
  });
});

test("sync request with multiple search params", () => {
  const syncRequest = getSync({
    searchParams: {
      set_presence: "offline",
      full_state: true,
    },
  });

  expect(syncRequest).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/sync?set_presence=offline&full_state=true",
    requireAuthentication: true,
  });
});
