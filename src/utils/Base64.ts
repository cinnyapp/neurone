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

export class Base64 {
  static encode(data: Uint8Array<ArrayBuffer>): string {
    // Node.js / Bun / Deno (Node compat)
    if (typeof globalThis.Buffer !== "undefined") {
      return globalThis.Buffer.from(data).toString("base64");
    }

    // Browser
    let binary = "";

    for (let i = 0; i < data.length; i++) {
      binary += String.fromCharCode(data[i]);
    }

    return btoa(binary);
  }

  static decode(data: string): Uint8Array<ArrayBuffer> {
    // Support base64url
    let safeData = data.replace(/-/g, "+").replace(/_/g, "/");

    // Restore padding
    while (safeData.length % 4 !== 0) {
      safeData += "=";
    }

    // Node.js / Bun / Deno (Node compat)
    if (typeof globalThis.Buffer !== "undefined") {
      return new Uint8Array(globalThis.Buffer.from(safeData, "base64"));
    }

    // Browser
    const binary = atob(safeData);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
  }
}
