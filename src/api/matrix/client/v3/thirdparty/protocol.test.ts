import { getProtocol, getProtocols } from "./protocol";

test("get third party network protocol", () => {
  const protocol = "some";

  expect(getProtocol({ pathParams: { protocol } })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/thirdparty/protocol/${encodeURIComponent(protocol)}`,
    requireAuthentication: true,
  });
});

test("get third party network protocols", () => {
  expect(getProtocols({})).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/thirdparty/protocols",
    requireAuthentication: true,
  });
});
