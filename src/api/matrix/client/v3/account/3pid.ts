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
  Get3pidEndpoint,
  Post3pidAddEndpoint,
  Post3pidBindEndpoint,
  Post3pidDeleteEndpoint,
  Post3pidEmailRequestTokenEndpoint,
  Post3pidMsisdnRequestTokenEndpoint,
  Post3pidUnbindEndpoint,
} from "./3pid.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3account3pid
 */
export const get3pid: Get3pidEndpoint = () => {
  const path = "/_matrix/client/v3/account/3pid";

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidadd
 */
export const post3pidAdd: Post3pidAddEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/account/3pid/add";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidbind
 */
export const post3pidBind: Post3pidBindEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/account/3pid/bind";

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3piddelete
 */
export const post3pidDelete: Post3pidDeleteEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/account/3pid/delete";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidemailrequesttoken
 */
export const post3pidEmailRequestToken: Post3pidEmailRequestTokenEndpoint = ({
  body,
}) => {
  const path = "/_matrix/client/v3/account/3pid/email/requestToken";

  return {
    method: "POST",
    path,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidmsisdnrequesttoken
 */
export const post3pidMsisdnRequestToken: Post3pidMsisdnRequestTokenEndpoint = ({
  body,
}) => {
  const path = "/_matrix/client/v3/account/3pid/msisdn/requestToken";

  return {
    method: "POST",
    path,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3account3pidunbind
 */
export const post3pidUnbind: Post3pidUnbindEndpoint = ({ body }) => {
  const path = "/_matrix/client/v3/account/3pid/unbind";

  return {
    method: "POST",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
