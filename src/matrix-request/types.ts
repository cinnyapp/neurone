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

import { MatrixEndpointStruct } from "../api/MatrixEndpoint";

export type MatrixRequest = (
  matrixEndpointStruct: MatrixEndpointStruct,
  abortSignal?: AbortSignal,
) => Promise<Response>;

export type MatrixErrorData = {
  errcode?: string;
  error?: string;
};

export type MatrixError<ErrorData = MatrixErrorData> = {
  url: string;
  status: number;
  data: ErrorData;
};

export type MatrixResponseResult<SuccessData, ErrorData = MatrixErrorData> =
  | [undefined, SuccessData]
  | [MatrixError<ErrorData>, undefined];

export type MatrixResponseParser = <SuccessData, ErrorData = MatrixErrorData>(
  response: Response,
) => Promise<MatrixResponseResult<SuccessData, ErrorData>>;
