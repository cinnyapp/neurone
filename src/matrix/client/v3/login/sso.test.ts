import { ssoRedirect, ssoRedirectIdpId } from "./sso";

test("get sso redirect request", () => {
  expect(
    ssoRedirect({
      redirectUrl: "http://server.name/path",
    }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/login/sso/redirect?redirectUrl=http%3A%2F%2Fserver.name%2Fpath",
  });
});

test("get sso redirect idp id request", () => {
  const idpId = "some-idp";
  expect(
    ssoRedirectIdpId(
      {
        idpId,
      },
      {
        redirectUrl: "http://server.name/path",
      },
    ),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/login/sso/redirect/${encodeURIComponent(idpId)}?redirectUrl=http%3A%2F%2Fserver.name%2Fpath`,
  });
});
