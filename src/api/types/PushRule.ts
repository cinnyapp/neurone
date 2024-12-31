export type PushRuleAction = string | object;

export type PushRuleCondition = {
  is?: string;
  key?: string;
  kind: string;
  pattern?: string;
  value?: (string | number | boolean | null)[];
};
export type PushRule = {
  actions: PushRuleAction[];
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
