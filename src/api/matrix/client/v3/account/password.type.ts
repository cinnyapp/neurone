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

import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postPassword types
 */
export type PostPasswordBody = {
  auth?: object;
  logout_devices?: boolean;
  new_password: string;
};
export type PostPasswordOK = Record<string, never>;
export type PostPasswordEndpoint = MatrixEndpoint<{
  body: PostPasswordBody;
}>;

/**
 * postPasswordEmailRequestToken types
 */
export type PostPasswordEmailRequestTokenBody = {
  client_secret: string;
  email: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  send_attempt: number;
};
export type PostPasswordEmailRequestTokenOK = {
  sid: string;
  submit_url?: string;
};
export type PostPasswordEmailRequestTokenEndpoint = MatrixEndpoint<{
  body: PostPasswordEmailRequestTokenBody;
}>;

/**
 * postPasswordMsisdnRequestToken types
 */
export type PostPasswordMsisdnRequestTokenBody = {
  client_secret: string;
  country: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  phone_number: string;
  send_attempt: number;
};
export type PostPasswordMsisdnRequestTokenOK = {
  sid: string;
  submit_url?: string;
};
export type PostPasswordMsisdnRequestTokenEndpoint = MatrixEndpoint<{
  body: PostPasswordMsisdnRequestTokenBody;
}>;
