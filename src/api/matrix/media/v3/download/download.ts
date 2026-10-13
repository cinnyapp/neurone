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
import { GetDownloadEndpoint, GetDownloadFileEndpoint } from "./download.type";

/**
 * @deprecated
 * https://spec.matrix.org/v1.11/client-server-api/#get_matrixmediav3downloadservernamemediaid
 */
export const getDownload: GetDownloadEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/media/v3/download/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
  };
};

/**
 * @deprecated
 * https://spec.matrix.org/v1.11/client-server-api/#get_matrixmediav3downloadservernamemediaidfilename
 */
export const getDownloadFile: GetDownloadFileEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/media/v3/download/${encodeURIComponent(pathParams.serverName)}/${encodeURIComponent(pathParams.mediaId)}/${encodeURIComponent(pathParams.fileName)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    rateLimited: true,
  };
};
