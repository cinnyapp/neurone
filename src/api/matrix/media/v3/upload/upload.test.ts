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

import { postUpload, putUpload } from "./upload";

test("post media upload request", () => {
  const blob = new Blob();

  expect(
    postUpload({
      searchParams: {
        filename: "myFile.ext",
      },
      body: blob,
    }),
  ).toEqual({
    method: "POST",
    path: "/_matrix/media/v3/upload?filename=myFile.ext",
    rateLimited: true,
    requireAuthentication: true,
    body: blob,
  });
});

test("put media upload request", () => {
  const serverName = "server.name";
  const mediaId = "some";
  const blob = new Blob();

  expect(
    putUpload({
      pathParams: { serverName, mediaId },
      body: blob,
      searchParams: {
        filename: "myFile.ext",
      },
    }),
  ).toEqual({
    method: "PUT",
    path: `/_matrix/media/v3/upload/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}?filename=myFile.ext`,
    rateLimited: true,
    requireAuthentication: true,
    body: blob,
  });
});
