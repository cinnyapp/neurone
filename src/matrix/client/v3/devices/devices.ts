import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  DeleteDeviceBody,
  DeleteDevicePathParams,
  DevicePathParams,
  PutDeviceBody,
  PutDevicePathParams,
} from "./devices.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3devices
 */
export const devices = (): MatrixRequestStruct => {
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
export const device = (pathParams: DevicePathParams): MatrixRequestStruct => {
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
export const putDevice = (
  pathParams: PutDevicePathParams,
  body: PutDeviceBody,
): MatrixRequestStruct => {
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
export const deleteDevice = (
  pathParams: DeleteDevicePathParams,
  body: DeleteDeviceBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/devices/${encodeURIComponent(pathParams.deviceId)}`;

  return {
    method: "DELETE",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
