import { postDeleteDevices } from "./deleteDevices";

test("post delete devices request", () => {
  const body = {
    devices: ["a", "b"],
  };

  expect(postDeleteDevices({ body })).toEqual({
    method: "POST",
    path: "/_matrix/client/v3/delete_devices",
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
