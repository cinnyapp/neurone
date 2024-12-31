import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import {
  PushRule,
  PushRuleAction,
  PushRuleCondition,
  PushRuleKind,
  PushRuleScope,
  PushRules,
} from "../../../../types";

/**
 * getPushRules types
 */
export type GetPushRulesOK = PushRules;
export type GetPushRulesEndpoint = MatrixEndpoint<object>;

/**
 * getPushRule types
 */
export type GetPushRulePathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type GetPushRuleOK = PushRule;
export type GetPushRuleEndpoint = MatrixEndpoint<{
  pathParams: GetPushRulePathParams;
}>;

/**
 * putPushRule types
 */
export type PutPushRulePathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type PutPushRuleSearchParams = {
  after?: string;
  before?: string;
};
export type PutPushRuleBody = {
  actions: PushRuleAction[];
  conditions?: PushRuleCondition[];
  pattern?: string;
};
export type PutPushRuleOK = Record<string, never>;
export type PutPushRuleEndpoint = MatrixEndpoint<{
  pathParams: PutPushRulePathParams;
  searchParams?: PutPushRuleSearchParams;
  body: PutPushRuleBody;
}>;

/**
 * deletePushRule types
 */
export type DeletePushRulePathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type DeletePushRuleOK = Record<string, never>;
export type DeletePushRuleEndpoint = MatrixEndpoint<{
  pathParams: DeletePushRulePathParams;
}>;

/**
 * getPushRuleActions
 */
export type GetPushRuleActionsPathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type GetPushRuleActionsOK = {
  actions: PushRuleAction[];
};
export type GetPushRuleActionsEndpoint = MatrixEndpoint<{
  pathParams: GetPushRuleActionsPathParams;
}>;

/**
 * putPushRuleActions
 */
export type PutPushRuleActionsPathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type PutPushRuleActionsBody = {
  actions: PushRuleAction[];
};
export type PutPushRuleActionsOK = Record<string, never>;
export type PutPushRuleActionsEndpoint = MatrixEndpoint<{
  pathParams: PutPushRuleActionsPathParams;
  body: PutPushRuleActionsBody;
}>;

/**
 * getPushRuleEnabled
 */
export type GetPushRuleEnabledPathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type GetPushRuleEnabledOK = {
  enabled: boolean;
};
export type GetPushRuleEnabledEndpoint = MatrixEndpoint<{
  pathParams: GetPushRuleEnabledPathParams;
}>;

/**
 * putPushRuleEnabled
 */
export type PutPushRuleEnabledPathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type PutPushRuleEnabledBody = {
  enabled: boolean;
};
export type PutPushRuleEnabledOK = Record<string, never>;
export type PutPushRuleEnabledEndpoint = MatrixEndpoint<{
  pathParams: PutPushRuleEnabledPathParams;
  body: PutPushRuleEnabledBody;
}>;
