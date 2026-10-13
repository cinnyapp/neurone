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
import { LoginFlow, UserIdentifier } from "../../../../types";

/**
 * getLogin types
 */
export type GetLoginOK = {
  flows?: LoginFlow[];
};
export type GetLoginEndpoint = MatrixEndpoint<object>;

/**
 * postLogin types
 */
export type PostLoginBody = {
  device_id?: string;
  identifier?: UserIdentifier;
  initial_device_display_name?: string;
  password?: string;
  refresh_token?: boolean;
  token?: string;
  type: string;
};
export type PostLoginOK = {
  access_token: string;
  device_id: string;
  expires_in_ms?: number;
  refresh_token?: string;
  user_id: string;
  well_known: object;
};

export type PostLoginEndpoint = MatrixEndpoint<{
  body: PostLoginBody;
}>;
