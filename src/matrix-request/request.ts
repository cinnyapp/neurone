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

import { MatrixRequest } from "./types";

export const makeRequest = (
  fetchFunc: typeof fetch,
  baseUrl: string,
  requestInit: RequestInit,
): MatrixRequest => {
  const request: MatrixRequest = async (
    matrixEndpointStruct,
    abortSignal,
  ): Promise<Response> => {
    const { method, path, body } = matrixEndpointStruct;
    const signal = abortSignal ?? requestInit.signal;

    const headers = new Headers(requestInit.headers);

    const response = await fetchFunc(`${baseUrl}${path}`, {
      ...requestInit,
      method,
      headers,
      body,
      signal,
    });

    return response;
  };

  return request;
};

// const matrixReq = makeRequest(
//   fetch,
//   "https://matrix-client.matrix.org",
//   {
//     headers: {
//       Authorization: "Bearer <access_token>",
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   },
// );

// matrixReq({
//   method: "GET",
//   path: "/",
//   requireAuthentication: true,
// });
