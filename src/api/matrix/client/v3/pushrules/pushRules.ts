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

import { withSearchParams } from "../../../../utils";
import {
  DeletePushRuleEndpoint,
  GetPushRuleActionsEndpoint,
  GetPushRuleEnabledEndpoint,
  GetPushRuleEndpoint,
  GetPushRulesEndpoint,
  PutPushRuleActionsEndpoint,
  PutPushRuleEnabledEndpoint,
  PutPushRuleEndpoint,
} from "./pushRules.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3pushrules
 */
export const getPushRules: GetPushRulesEndpoint = () => {
  const path = "/_matrix/client/v3/pushrules";

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3pushrulesscopekindruleid
 */
export const getPushRule: GetPushRuleEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/pushrules/${encodeURIComponent(pathParams.scope)}/${encodeURIComponent(pathParams.kind)}/${encodeURIComponent(pathParams.ruleId)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3pushrulesscopekindruleid
 */
export const putPushRule: PutPushRuleEndpoint = ({
  pathParams,
  body,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v3/pushrules/${encodeURIComponent(pathParams.scope)}/${encodeURIComponent(pathParams.kind)}/${encodeURIComponent(pathParams.ruleId)}`,
    searchParams,
  );

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3pushrulesscopekindruleid
 */
export const deletePushRule: DeletePushRuleEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/pushrules/${encodeURIComponent(pathParams.scope)}/${encodeURIComponent(pathParams.kind)}/${encodeURIComponent(pathParams.ruleId)}`;

  return {
    method: "DELETE",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3pushrulesscopekindruleidactions
 */
export const getPushRuleActions: GetPushRuleActionsEndpoint = ({
  pathParams,
}) => {
  const path = `/_matrix/client/v3/pushrules/${encodeURIComponent(pathParams.scope)}/${encodeURIComponent(pathParams.kind)}/${encodeURIComponent(pathParams.ruleId)}/actions`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3pushrulesscopekindruleidactions
 */
export const putPushRuleActions: PutPushRuleActionsEndpoint = ({
  pathParams,
  body,
}) => {
  const path = `/_matrix/client/v3/pushrules/${encodeURIComponent(pathParams.scope)}/${encodeURIComponent(pathParams.kind)}/${encodeURIComponent(pathParams.ruleId)}/actions`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3pushrulesscopekindruleidenabled
 */
export const getPushRuleEnabled: GetPushRuleEnabledEndpoint = ({
  pathParams,
}) => {
  const path = `/_matrix/client/v3/pushrules/${encodeURIComponent(pathParams.scope)}/${encodeURIComponent(pathParams.kind)}/${encodeURIComponent(pathParams.ruleId)}/enabled`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3pushrulesscopekindruleidenabled
 */
export const putPushRuleEnabled: PutPushRuleEnabledEndpoint = ({
  pathParams,
  body,
}) => {
  const path = `/_matrix/client/v3/pushrules/${encodeURIComponent(pathParams.scope)}/${encodeURIComponent(pathParams.kind)}/${encodeURIComponent(pathParams.ruleId)}/enabled`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
