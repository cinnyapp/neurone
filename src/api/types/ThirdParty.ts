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

export type ThirdPartySigned = {
  mxid: string;
  sender: string;
  signatures: object;
  token: string;
};

export type ThirdPartyIdMedium = "email" | "msisdn";

export type ThirdPartyId = {
  added_at: number;
  address: string;
  medium: ThirdPartyIdMedium;
  validated_at: number;
};

export type ThirdPartyIdUnbindResult = "success" | "no-support";

export type ThirdPartyIdInvite = {
  address: string;
  id_access_token: string;
  id_server: string;
  medium: string;
};

export type ThirdPartyNetworkLocation = {
  alias: string;
  fields: object;
  protocol: string;
};

export type ProtocolInstance = {
  desc: string;
  fields: object;
  icon?: string;
  instance_id?: string;
  network_id: string;
};

export type ProtocolFieldType = {
  placeholder: string;
  regexp: string;
};

export type ThirdPartyProtocol = {
  field_types: Record<string, ProtocolFieldType>;
  icon: string;
  instances: ProtocolInstance[];
  location_fields: string[];
  user_fields: string[];
};

export type ThirdPartyUser = {
  fields: object;
  protocol: string;
  userid: string;
};
