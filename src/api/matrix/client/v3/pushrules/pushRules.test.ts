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
