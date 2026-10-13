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

import {
  postPassword,
  postPasswordEmailRequestToken,
  postPasswordMsisdnRequestToken,
} from "./password";

test("post account password change request", () => {
  const body = {
    new_password: "new_pass",
  };

  expect(postPassword({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/password",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("post account password email request token request", () => {
  const body = {
    client_secret: "XYZ",
    email: "some@email.com",
    send_attempt: 1,
  };

  expect(postPasswordEmailRequestToken({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/password/email/requestToken",
    body: JSON.stringify(body),
  });
});

test("post account password msisdn request token request", () => {
  const body = {
    client_secret: "XYZ",
    country: "+0",
    phone_number: "11233",
    send_attempt: 1,
  };

  expect(postPasswordMsisdnRequestToken({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/password/msisdn/requestToken",
    body: JSON.stringify(body),
  });
});
