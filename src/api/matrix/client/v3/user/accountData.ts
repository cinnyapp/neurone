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
  GetAccountDataEndpoint,
  PutAccountDataEndpoint,
} from "./accountData.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3useruseridaccount_datatype
 */
export const getAccountData: GetAccountDataEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/account_data/${encodeURIComponent(pathParams.type)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3useruseridaccount_datatype
 */
export const putAccountData: PutAccountDataEndpoint = ({
  pathParams,
  body,
}) => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/account_data/${encodeURIComponent(pathParams.type)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
