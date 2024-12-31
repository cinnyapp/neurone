import { getSSORedirect, getSSORedirectIdpId } from "./sso";

test("get sso redirect request", () => {
  expect(
    getSSORedirect({
      searchParams: {
        redirectUrl: "http://server.name/path",
      },
    }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/login/sso/redirect?redirectUrl=http%3A%2F%2Fserver.name%2Fpath",
  });
});

test("get sso redirect idp id request", () => {
  const idpId = "some-idp";
  expect(
    getSSORedirectIdpId({
      pathParams: {
        idpId,
      },
      searchParams: {
        redirectUrl: "http://server.name/path",
      },
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/login/sso/redirect/${encodeURIComponent(idpId)}?redirectUrl=http%3A%2F%2Fserver.name%2Fpath`,
  });
});
