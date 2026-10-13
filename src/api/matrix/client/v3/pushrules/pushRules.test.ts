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
  getPushRules,
  getPushRule,
  putPushRule,
  deletePushRule,
  getPushRuleActions,
  putPushRuleActions,
  getPushRuleEnabled,
  putPushRuleEnabled,
} from "./pushRules";

test("get push rules request", () => {
  expect(getPushRules({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/pushrules",
    requireAuthentication: true,
  });
});

test("get push rule request", () => {
  const scope = "global";
  const kind = "content";
  const ruleId = "xyz";

  expect(getPushRule({ pathParams: { scope, kind, ruleId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/pushrules/${encodeURIComponent(scope)}/${encodeURIComponent(kind)}/${encodeURIComponent(ruleId)}`,
    requireAuthentication: true,
  });
});

test("put push rule request", () => {
  const scope = "global";
  const kind = "content";
  const ruleId = "xyz";
  const body = {
    actions: ["notify"],
    conditions: [
      {
        kind: "some",
      },
    ],
  };

  expect(
    putPushRule({
      pathParams: { scope, kind, ruleId },
      body,
      searchParams: {
        after: "some",
      },
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/pushrules/${encodeURIComponent(scope)}/${encodeURIComponent(kind)}/${encodeURIComponent(ruleId)}?after=some`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete push rule request", () => {
  const scope = "global";
  const kind = "content";
  const ruleId = "xyz";

  expect(deletePushRule({ pathParams: { scope, kind, ruleId } })).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/pushrules/${encodeURIComponent(scope)}/${encodeURIComponent(kind)}/${encodeURIComponent(ruleId)}`,
    requireAuthentication: true,
  });
});

test("get push rule actions request", () => {
  const scope = "global";
  const kind = "content";
  const ruleId = "xyz";

  expect(getPushRuleActions({ pathParams: { scope, kind, ruleId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/pushrules/${encodeURIComponent(scope)}/${encodeURIComponent(kind)}/${encodeURIComponent(ruleId)}/actions`,
    requireAuthentication: true,
  });
});

test("put push rule actions request", () => {
  const scope = "global";
  const kind = "content";
  const ruleId = "xyz";
  const body = {
    actions: ["notify"],
  };

  expect(
    putPushRuleActions({ pathParams: { scope, kind, ruleId }, body }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/pushrules/${encodeURIComponent(scope)}/${encodeURIComponent(kind)}/${encodeURIComponent(ruleId)}/actions`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("get push rule enabled request", () => {
  const scope = "global";
  const kind = "content";
  const ruleId = "xyz";

  expect(getPushRuleEnabled({ pathParams: { scope, kind, ruleId } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/pushrules/${encodeURIComponent(scope)}/${encodeURIComponent(kind)}/${encodeURIComponent(ruleId)}/enabled`,
    requireAuthentication: true,
  });
});

test("put push rule enabled request", () => {
  const scope = "global";
  const kind = "content";
  const ruleId = "xyz";
  const body = {
    enabled: true,
  };

  expect(
    putPushRuleEnabled({ pathParams: { scope, kind, ruleId }, body }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/pushrules/${encodeURIComponent(scope)}/${encodeURIComponent(kind)}/${encodeURIComponent(ruleId)}/enabled`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
