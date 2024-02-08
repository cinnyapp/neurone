import { location, locationProtocol } from "./location";

test("get third party network locations", () => {
  expect(
    location({
      alias: "#alias:server.name",
    }),
  ).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/thirdparty/location?alias=%23alias%3Aserver.name",
    requireAuthentication: true,
  });
});

test("get third party network protocol locations", () => {
  const protocol = "some";
  expect(
    locationProtocol({
      protocol,
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/thirdparty/location/${encodeURIComponent(protocol)}`,
    requireAuthentication: true,
  });
});
