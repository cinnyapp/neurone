import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { withSearchParams } from "../../../_utils/withSearchParams";
import {
  DeletePushRulePathParams,
  PushRuleActionsPathParams,
  PushRuleEnabledPathParams,
  PushRulePathParams,
  PutPushRuleActionsBody,
  PutPushRuleActionsPathParams,
  PutPushRuleBody,
  PutPushRuleEnabledBody,
  PutPushRuleEnabledPathParams,
  PutPushRulePathParams,
  PutPushRuleSearchParams,
} from "./pushRules.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3pushrules
 */
export const pushRules = (): MatrixRequestStruct => {
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
export const pushRule = (
  pathParams: PushRulePathParams,
): MatrixRequestStruct => {
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
export const putPushRule = (
  pathParams: PutPushRulePathParams,
  body: PutPushRuleBody,
  searchParams?: PutPushRuleSearchParams,
): MatrixRequestStruct => {
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
export const deletePushRule = (
  pathParams: DeletePushRulePathParams,
): MatrixRequestStruct => {
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
export const pushRuleActions = (
  pathParams: PushRuleActionsPathParams,
): MatrixRequestStruct => {
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
export const putPushRuleActions = (
  pathParams: PutPushRuleActionsPathParams,
  body: PutPushRuleActionsBody,
): MatrixRequestStruct => {
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
export const pushRuleEnabled = (
  pathParams: PushRuleEnabledPathParams,
): MatrixRequestStruct => {
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
export const putPushRuleEnabled = (
  pathParams: PutPushRuleEnabledPathParams,
  body: PutPushRuleEnabledBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/pushrules/${encodeURIComponent(pathParams.scope)}/${encodeURIComponent(pathParams.kind)}/${encodeURIComponent(pathParams.ruleId)}/enabled`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
