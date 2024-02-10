import { postEmailRequestToken } from "./email";

test("post register email request token request", () => {
  const body = {
    client_secret: "XYZ",
    email: "some@email.com",
    send_attempt: 1,
  };

  expect(postEmailRequestToken(body)).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/register/email/requestToken",
    body: JSON.stringify(body),
  });
});
