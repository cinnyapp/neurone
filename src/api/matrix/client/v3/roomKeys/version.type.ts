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
import { BackupVersionInfo } from "../../../../types";

/**
 * getVersion type
 */
export type GetVersionOK = BackupVersionInfo;
export type GetVersionEndpoint = MatrixEndpoint<object>;

/**
 * postVersion
 */
export type PostVersionBody = {
  algorithm: string;
  auth_data: object;
};
export type PostVersionOK = {
  version: string;
};
export type PostVersionEndpoint = MatrixEndpoint<{
  body: PostVersionBody;
}>;

/**
 * getVersionVersion type
 */
export type GetVersionVersionPathParams = {
  version: string;
};
export type GetVersionVersionOK = BackupVersionInfo;
export type GetVersionVersionEndpoint = MatrixEndpoint<{
  pathParams: GetVersionVersionPathParams;
}>;

/**
 * putVersionVersion types
 */
export type PutVersionVersionPathParams = {
  version: string;
};
export type PutVersionVersionBody = {
  algorithm: string;
  auth_data: object;
  version?: string;
};
export type PutVersionVersionOK = Record<string, never>;
export type PutVersionVersionEndpoint = MatrixEndpoint<{
  pathParams: PutVersionVersionPathParams;
  body: PutVersionVersionBody;
}>;

/**
 * deleteVersionVersion types
 */
export type DeleteVersionVersionPathParams = {
  version: string;
};
export type DeleteVersionVersionOK = Record<string, never>;
export type DeleteVersionVersionEndpoint = MatrixEndpoint<{
  pathParams: DeleteVersionVersionPathParams;
}>;
