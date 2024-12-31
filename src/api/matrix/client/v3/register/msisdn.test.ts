import { postMsisdnRequestToken } from "./msisdn";

test("post register msisdn request token request", () => {
  const body = {
    client_secret: "XYZ",
    country: "+00",
    phone_number: "1234",
    send_attempt: 1,
  };

  expect(postMsisdnRequestToken({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/register/msisdn/requestToken",
    body: JSON.stringify(body),
  });
});
