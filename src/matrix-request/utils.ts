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

import { MatrixError, MatrixErrorData, MatrixResponseParser } from "./types";

export const parseMatrixResp: MatrixResponseParser = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const err = {
      url: response.url,
      status: response.status,
      data,
    };

    return [err, undefined];
  }
  return [undefined, data];
};

export function printMatrixError<ErrorData extends MatrixErrorData>(
  error: MatrixError<ErrorData>,
): string {
  const { url, status, data } = error;
  const errcode = data.errcode ?? "UNKNOWN_ERROR";
  const message = data.error ?? "An unexpected error occurred.";
  return `[${status}] ${errcode}: ${message} (${url})`;
}
