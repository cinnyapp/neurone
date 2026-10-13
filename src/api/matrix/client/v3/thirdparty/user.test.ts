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

import { getUser, getUserProtocol } from "./user";

test("get third party users", () => {
  expect(
    getUser({
      searchParams: {
        userid: "@some:server.name",
      },
    }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/thirdparty/user?userid=%40some%3Aserver.name",
    requireAuthentication: true,
  });
});

test("get third party user protocol", () => {
  const protocol = "some";

  expect(
    getUserProtocol({
      pathParams: { protocol },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/thirdparty/user/${encodeURIComponent(protocol)}`,
    requireAuthentication: true,
  });
});
