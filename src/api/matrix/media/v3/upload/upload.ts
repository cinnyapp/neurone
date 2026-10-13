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

import { withSearchParams } from "../../../../utils";
import { PostUploadEndpoint, PutUploadEndpoint } from "./upload.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixmediav3upload
 */
export const postUpload: PostUploadEndpoint = ({ body, searchParams }) => {
  const path = withSearchParams("/_matrix/media/v3/upload", searchParams);

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body,
  };
};

/**
 * https://spec.matrix.org/v1.11/client-server-api/#put_matrixmediav3uploadservernamemediaid
 */
export const putUpload: PutUploadEndpoint = ({
  pathParams,
  body,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/media/v3/upload/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    searchParams,
  );

  return {
    method: "PUT",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body,
  };
};
