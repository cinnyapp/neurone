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
import {
  ThirdPartyId,
  ThirdPartyIdMedium,
  ThirdPartyIdUnbindResult,
} from "../../../../types";

/**
 * get3pid types
 */
export type Get3pidOK = {
  threepids: ThirdPartyId[];
};
export type Get3pidEndpoint = MatrixEndpoint<object>;

/**
 * post3pidAdd types
 */
export type Post3pidAddBody = {
  auth?: object;
  client_secret: string;
  sid: string;
};
export type Post3pidAddOK = Record<string, never>;
export type Post3pidAddEndpoint = MatrixEndpoint<{
  body: Post3pidAddBody;
}>;

/**
 * post3pidBind types
 */
export type Post3pidBindBody = {
  client_secret: string;
  id_access_token: string;
  id_server: string;
  sid: string;
};
export type Post3pidBindOK = Record<string, never>;
export type Post3pidBindEndpoint = MatrixEndpoint<{
  body: Post3pidBindBody;
}>;

/**
 * post3pidDelete types
 */
export type Post3pidDeleteBody = {
  address: string;
  id_server?: string;
  medium: ThirdPartyIdMedium;
};
export type Post3pidDeleteOK = {
  id_server_unbind_result: ThirdPartyIdUnbindResult;
};
export type Post3pidDeleteEndpoint = MatrixEndpoint<{
  body: Post3pidDeleteBody;
}>;

/**
 * post3pidEmailRequestToken types
 */
export type Post3pidEmailRequestTokenBody = {
  client_secret: string;
  email: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  send_attempt: number;
};
export type Post3pidEmailRequestTokenOK = {
  sid: string;
  submit_url?: string;
};
export type Post3pidEmailRequestTokenEndpoint = MatrixEndpoint<{
  body: Post3pidEmailRequestTokenBody;
}>;

/**
 * post3pidEmailRequestToken types
 */
export type Post3pidMsisdnRequestTokenBody = {
  client_secret: string;
  country: string;
  id_access_token?: string;
  id_server?: string;
  next_link?: string;
  phone_number: string;
  send_attempt: number;
};
export type Post3pidMsisdnRequestTokenOK = {
  sid: string;
  submit_url?: string;
};
export type Post3pidMsisdnRequestTokenEndpoint = MatrixEndpoint<{
  body: Post3pidMsisdnRequestTokenBody;
}>;

/**
 * post3pidUnbind types
 */
export type Post3pidUnbindBody = {
  address: string;
  id_server?: string;
  medium: ThirdPartyIdMedium;
};
export type Post3pidUnbindOK = {
  id_server_unbind_result: ThirdPartyIdUnbindResult;
};
export type Post3pidUnbindEndpoint = MatrixEndpoint<{
  body: Post3pidUnbindBody;
}>;
