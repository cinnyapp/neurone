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
  get3pid,
  post3pidAdd,
  post3pidBind,
  post3pidDelete,
  post3pidEmailRequestToken,
  post3pidMsisdnRequestToken,
  post3pidUnbind,
} from "./3pid";
import { Post3pidDeleteBody } from "./3pid.type";

test("get account 3pid's request", () => {
  expect(get3pid({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/account/3pid",
    requireAuthentication: true,
  });
});

test("post account 3pid add request", () => {
  const body = {
    client_secret: "some",
    sid: "some",
  };

  expect(post3pidAdd({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/3pid/add",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("post account 3pid bind request", () => {
  const body = {
    client_secret: "some",
    id_access_token: "some",
    id_server: "some",
    sid: "some",
  };

  expect(post3pidBind({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/3pid/bind",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("post account 3pid delete request", () => {
  const body: Post3pidDeleteBody = {
    address: "some@mail.com",
    medium: "email",
  };

  expect(post3pidDelete({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/3pid/delete",
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("post account 3pid email request token request", () => {
  const body = {
    client_secret: "XYZ",
    email: "some@email.com",
    send_attempt: 1,
  };

  expect(post3pidEmailRequestToken({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/3pid/email/requestToken",
    body: JSON.stringify(body),
  });
});

test("post account 3pid msisdn request token request", () => {
  const body = {
    client_secret: "XYZ",
    country: "+0",
    phone_number: "11233",
    send_attempt: 1,
  };

  expect(post3pidMsisdnRequestToken({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/3pid/msisdn/requestToken",
    body: JSON.stringify(body),
  });
});

test("post account 3pid unbind request", () => {
  const body: Post3pidDeleteBody = {
    address: "some@mail.com",
    medium: "email",
  };

  expect(post3pidUnbind({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/3pid/unbind",
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
