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

export type KeyObject = {
  key: string;
  signatures: Record<string, object>;
};

export type OneTimeKeys = Record<string, string | KeyObject>;
export type DeviceIdToOneTimeKeys = Record<string, OneTimeKeys>;
export type UserIdToDevicesOneTimeKeys = Record<string, DeviceIdToOneTimeKeys>;

export type CrossSigningKey = {
  keys: Record<string, string>;
  signatures?: Record<string, Record<string, string>>;
  usage: string[];
  user_id: string;
};

export type UnsignedDeviceInfo = { device_display_name: string };

export type DeviceKeys = {
  algorithms: string[];
  device_id: string;
  keys: Record<string, string>;
  signatures: Record<string, Record<string, string>>;
  user_id: string;
};

export type DeviceKeysInformation = DeviceKeys & {
  unsigned: UnsignedDeviceInfo;
};
