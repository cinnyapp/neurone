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

import { postReadMarkers } from "./readMarkers";

test("post full read markers for room request", () => {
  const roomId = "!roomId:server.name";

  const body = {
    "m.read": "$evtid:server.name",
  };

  expect(postReadMarkers({ pathParams: { roomId }, body })).toEqual({
    method: "POST",
    path: `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/read_markers`,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body),
  });
});
