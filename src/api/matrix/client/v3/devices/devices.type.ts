/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
