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
 * postUpload types
 */
export type PostUploadSearchParams = {
  filename?: string;
};
export type PostUploadBody = FormData | Blob;
export type PostUploadOK = {
  content_uri: string;
};
export type PostUploadEndpoint = MatrixEndpoint<{
  searchParams?: PostUploadSearchParams;
  body: PostUploadBody;
}>;

/**
 * putUpload types
 */
export type PutUploadPathParams = {
  serverName: string;
  mediaId: string;
};
export type PutUploadSearchParams = {
  filename?: string;
};
export type PutUploadBody = FormData | Blob;
export type PutUploadOK = Record<string, never>;
export type PutUploadEndpoint = MatrixEndpoint<{
  pathParams: PutUploadPathParams;
  searchParams?: PutUploadSearchParams;
  body: PutUploadBody;
}>;
