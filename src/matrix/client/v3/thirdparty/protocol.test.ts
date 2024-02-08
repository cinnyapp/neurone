import { protocol, protocols } from "./protocol";

test("get third party network protocol", () => {
  const protocol1 = "some";

  expect(protocol({ protocol: protocol1 })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/thirdparty/protocol/${encodeURIComponent(protocol1)}`,
    requireAuthentication: true,
  });
});

test("get third party network protocols", () => {
  expect(protocols()).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/thirdparty/protocols",
    requireAuthentication: true,
  });
});
