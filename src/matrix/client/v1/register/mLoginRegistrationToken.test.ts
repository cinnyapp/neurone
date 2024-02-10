import { mLoginRegistrationTokenValidity } from "./mLoginRegistrationToken";

test("get registration token validity request", () => {
  expect(mLoginRegistrationTokenValidity({ token: "XYZ" })).toEqual({
    method: "GET",
    path: "/_matrix/client/v1/register/m.login.registration_token/validity?token=XYZ",
    rateLimited: true,
  });
});
