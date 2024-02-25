import { devices, device, putDevice, deleteDevice } from "./devices";

test("get current user devices request", () => {
  expect(devices()).toEqual({
    method: "GET",
    path: "/_matrix/client/v3/devices",
    requireAuthentication: true,
  });
});

test("get current user device request", () => {
  const deviceId = "some";

  expect(device({ deviceId })).toEqual({
    method: "GET",
    path: `/_matrix/client/v3/devices/${encodeURIComponent(deviceId)}`,
    requireAuthentication: true,
  });
});

test("put current user device request", () => {
  const deviceId = "some";
  const body = {
    display_name: "some",
  };

  expect(putDevice({ deviceId }, body)).toEqual({
    method: "PUT",
    path: `/_matrix/client/v3/devices/${encodeURIComponent(deviceId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});

test("delete current user device request", () => {
  const deviceId = "some";
  const body = {};

  expect(deleteDevice({ deviceId }, body)).toEqual({
    method: "DELETE",
    path: `/_matrix/client/v3/devices/${encodeURIComponent(deviceId)}`,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
