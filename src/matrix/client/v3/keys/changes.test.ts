import { changes } from "./changes";

test("get key changes request", () => {
  expect(
    changes({
      from: "some",
      to: "some",
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/keys/changes?from=some&to=some`,
    requireAuthentication: true,
  });
});
