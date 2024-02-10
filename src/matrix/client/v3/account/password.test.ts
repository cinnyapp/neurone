import {
  postPassword,
  postPasswordEmailRequestToken,
  postPasswordMsisdnRequestToken,
} from "./password";

test("post account password change request", () => {
  const body = {
    new_password: "new_pass",
  };

  expect(postPassword(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/password",
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("post account password email request token request", () => {
  const body = {
    client_secret: "XYZ",
    email: "some@email.com",
    send_attempt: 1,
  };

  expect(postPasswordEmailRequestToken(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/password/email/requestToken",
    body: JSON.stringify(body),
  });
});

test("post account password msisdn request token request", () => {
  const body = {
    client_secret: "XYZ",
    country: "+0",
    phone_number: "11233",
    send_attempt: 1,
  };

  expect(postPasswordMsisdnRequestToken(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/account/password/msisdn/requestToken",
    body: JSON.stringify(body),
  });
});
