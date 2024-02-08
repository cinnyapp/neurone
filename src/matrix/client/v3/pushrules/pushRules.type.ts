export type PushRuleCondition = {
  is?: string;
  key?: string;
  kind: string;
  pattern?: string;
  value?: (string | number | boolean | null)[];
};

export type PushRule = {
  actions: (string | object)[];
  conditions?: PushRuleCondition[];
  default: boolean;
  enabled: boolean;
  pattern?: string;
  rule_id: string;
};

export type PushRuleSet = {
  content?: PushRule[];
  override?: PushRule[];
  room?: PushRule[];
  sender?: PushRule[];
  underride?: PushRule[];
};

export type PushRules = {
  global: PushRuleSet;
};

export type PushRuleScope = "global";
export type PushRuleKind =
  | "override"
  | "underride"
  | "sender"
  | "room"
  | "content";

/**
 * pushRules types
 */
export type PushRulesOK = PushRules;

/**
 * pushRule types
 */
export type PushRulePathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type PushRuleOK = PushRule;

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
  actions: (string | object)[];
  conditions?: PushRuleCondition[];
  pattern?: string;
};
export type PutPushRuleOK = Record<string, never>;

/**
 * deletePushRule types
 */
export type DeletePushRulePathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type DeletePushRuleOK = Record<string, never>;

/**
 * pushRuleActions
 */
export type PushRuleActionsPathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type PushRuleActionsOK = {
  actions: (string | object)[];
};

/**
 * putPushRuleActions
 */
export type PutPushRuleActionsPathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type PutPushRuleActionsBody = {
  actions: (string | object)[];
};
export type PutPushRuleActionsOK = Record<string, never>;

/**
 * pushRuleEnabled
 */
export type PushRuleEnabledPathParams = {
  scope: PushRuleScope;
  kind: PushRuleKind;
  ruleId: string;
};
export type PushRuleEnabledOK = {
  enabled: boolean;
};

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
