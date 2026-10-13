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

export type PushRuleAction = string | object;

export type PushRuleCondition = {
  is?: string;
  key?: string;
  kind: string;
  pattern?: string;
  value?: string | number | boolean | null;
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
