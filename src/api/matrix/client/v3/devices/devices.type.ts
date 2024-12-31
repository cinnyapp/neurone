import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { Device } from "../../../../types";

/**
 * getDevices types
 */
export type GetDevicesOK = {
  devices: Device[];
};
export type GetDevicesEndpoint = MatrixEndpoint<object>;

/**
 * getDevice types
 */
export type GetDevicePathParams = {
  deviceId: string;
};

export type GetDeviceOK = Device;
export type GetDeviceEndpoint = MatrixEndpoint<{
  pathParams: GetDevicePathParams;
}>;

/**
 * putDevice types
 */

export type PutDevicePathParams = {
  deviceId: string;
};
export type PutDeviceBody = {
  display_name?: string;
};
export type PutDeviceOK = Record<string, never>;

export type PutDeviceEndpoint = MatrixEndpoint<{
  pathParams: PutDevicePathParams;
  body: PutDeviceBody;
}>;

/**
 * deleteDevice types
 */
export type DeleteDevicePathParams = {
  deviceId: string;
};
export type DeleteDeviceBody = {
  auth?: object;
};
export type DeleteDeviceOK = Record<string, never>;
export type DeleteDeviceEndpoint = MatrixEndpoint<{
  pathParams: DeleteDevicePathParams;
  body: DeleteDeviceBody;
}>;
