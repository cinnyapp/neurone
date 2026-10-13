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

import { Base64 } from "./Base64";

/**
 * Generates a cryptographically secure random string.
 *
 * Random bytes are generated using the Web Crypto API and then
 * encoded as a hexadecimal string.
 *
 * Each byte becomes two hexadecimal characters, so the resulting
 * string length will be `length * 2`.
 *
 * @param bytes Number of random bytes to generate.
 * @returns Hex-encoded cryptographically secure random string.
 */
export function randomString(bytes = 32): string {
  const data = globalThis.crypto.getRandomValues(new Uint8Array(bytes));

  return Array.from(data)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generates a cryptographically secure random Base64url string.
 *
 * Random bytes are generated using the Web Crypto API and encoded
 * using the Base64url alphabet defined by RFC 4648.
 *
 * Base64url is a URL-safe variant of Base64 where:
 * - `+` is replaced with `-`
 * - `/` is replaced with `_`
 * - `=` padding is removed
 *
 * @param bytes Number of random bytes to generate.
 * @returns URL-safe Base64 encoded random string.
 */
export function randomBase64Url(bytes = 32): string {
  const data = globalThis.crypto.getRandomValues(new Uint8Array(bytes));

  // Convert standard Base64 into Base64url format.
  return Base64.encode(data)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
