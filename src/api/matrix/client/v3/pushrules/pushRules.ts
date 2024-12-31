import { withSearchParams } from "../../../../utils/withSearchParams";
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
