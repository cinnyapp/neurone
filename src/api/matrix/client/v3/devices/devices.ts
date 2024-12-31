import {
  DeleteDeviceEndpoint,
  GetDeviceEndpoint,
  GetDevicesEndpoint,
  PutDeviceEndpoint,
} from "./devices.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3devices
 */
export const getDevices: GetDevicesEndpoint = () => {
  const path = "/_matrix/client/v3/devices";

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3devicesdeviceid
 */
export const getDevice: GetDeviceEndpoint = ({ pathParams }) => {
  const path = `/_matrix/client/v3/devices/${encodeURIComponent(pathParams.deviceId)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3devicesdeviceid
 */
export const putDevice: PutDeviceEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/devices/${encodeURIComponent(pathParams.deviceId)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#delete_matrixclientv3devicesdeviceid
 */
export const deleteDevice: DeleteDeviceEndpoint = ({ pathParams, body }) => {
  const path = `/_matrix/client/v3/devices/${encodeURIComponent(pathParams.deviceId)}`;

  return {
    method: "DELETE",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
