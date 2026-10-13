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

type ConnectionInfo = {
  ip?: string;
  last_seen?: number;
  user_agent?: string;
};

export type SessionInfo = {
  connections?: ConnectionInfo[];
};

export type DeviceInfo = {
  sessions?: SessionInfo[];
};

export type Device = {
  device_id: string;
  display_name?: string;
  last_seen_ip?: string;
  last_seen_ts?: number;
};

export type ToDeviceEvent<Content extends object = object> = {
  content: Content;
  sender: string;
  type: string;
};
