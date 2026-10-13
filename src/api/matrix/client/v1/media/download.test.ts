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

import { getDownload, getDownloadFile } from "./download";

test("get media download request", () => {
  const serverName = "server.name";
  const mediaId = "some";

  expect(
    getDownload({
      pathParams: { serverName, mediaId },
      searchParams: {},
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/media/download/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}`,
    rateLimited: true,
    requireAuthentication: true,
  });
});

test("get media download file request", () => {
  const serverName = "server.name";
  const mediaId = "some";
  const fileName = "name.filetype";

  expect(
    getDownloadFile({
      pathParams: { serverName, mediaId, fileName },
      searchParams: {},
    }),
  ).toEqual({
    method: "GET",
    path: `/_matrix/client/v1/media/download/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}/${encodeURIComponent(fileName)}`,
    rateLimited: true,
    requireAuthentication: true,
  });
});
