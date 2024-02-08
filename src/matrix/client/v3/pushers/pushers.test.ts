import { pushers, postPushersSet } from "./pushers";

test("get pushers request", () => {
  expect(pushers()).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/pushers",
    requireAuthentication: true,
  });
});

test("post pushers request set", () => {
  const body = {
    app_id: "some",
    kind: null,
    pushkey: "some",
  };

  expect(postPushersSet(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/pushers/set",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
