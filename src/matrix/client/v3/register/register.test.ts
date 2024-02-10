import { postRegister } from "./register";

test("post register request", () => {
  expect(postRegister({ kind: "user" })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/register?kind=user",
    rateLimited: true,
  });
});
