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

import {
  MatrixEndpointSearchParams,
  SearchParamValue,
} from "../MatrixEndpoint";

export const withSearchParams = (
  path: string,
  searchParams?: MatrixEndpointSearchParams,
): string => {
  if (!searchParams) return path;

  const urlSearchParams = new URLSearchParams();

  const appendParam = (key: string, value: SearchParamValue) => {
    /**
     * Ignore undefined values so they are not serialized
     * as the string "undefined".
     */
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => appendParam(key, item));
      return;
    }
    urlSearchParams.append(key, String(value));
  };

  Object.entries(searchParams).forEach(([keys, value]) =>
    appendParam(keys, value),
  );

  const query = urlSearchParams.toString();

  return query ? `${path}?${query}` : path;
};
