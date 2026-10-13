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

import { getSSORedirect, getSSORedirectIdpId } from "./sso";

test("get sso redirect request", () => {
  expect(
    getSSORedirect({
      searchParams: {
        redirectUrl: "http://server.name/path",
      },
    }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/login/sso/redirect?redirectUrl=http%3A%2F%2Fserver.name%2Fpath",
  });
});

test("get sso redirect idp id request", () => {
  const idpId = "some-idp";
  expect(
    getSSORedirectIdpId({
      pathParams: {
        idpId,
      },
      searchParams: {
        redirectUrl: "http://server.name/path",
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/login/sso/redirect/${encodeURIComponent(idpId)}?redirectUrl=http%3A%2F%2Fserver.name%2Fpath`,
  });
});
