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

/**
 * getAuthMetadata types
 */
export type GetAuthMetadataOK = {
  account_management_actions_supported?: string[];
  account_management_uri?: string;
  authorization_endpoint: string;
  code_challenge_methods_supported: string[];
  device_authorization_endpoint?: string;
  grant_types_supported: string[];
  issuer: string;
  prompt_values_supported?: string;
  registration_endpoint: string;
  response_modes_supported: string[];
  response_types_supported: string[];
  revocation_endpoint: string;
  token_endpoint: string;
};

export type GetAuthMetadataEndpoint = MatrixEndpoint<object>;
