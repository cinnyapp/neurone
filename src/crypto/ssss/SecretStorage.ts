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

import { ObjectReader } from "../../utils";
import { AesHmacSha2EncryptedData } from "./AesHmacSha2";

export type Secret = {
  encrypted: Record<string, AesHmacSha2EncryptedData>;
};

export class SecretStorage {
  static getAllKeyId(data: unknown): string[] {
    const encrypted = ObjectReader.object(data, "encrypted");
    if (!encrypted) return [];

    return Object.keys(encrypted);
  }

  static getEncryptedData(
    keyId: string,
    data: unknown,
  ): AesHmacSha2EncryptedData | undefined {
    const encrypted = ObjectReader.object(data, "encrypted");
    const encData = ObjectReader.object(encrypted, keyId);

    const iv = ObjectReader.string(encData, "iv");
    const mac = ObjectReader.string(encData, "mac");
    const ciphertext = ObjectReader.string(encData, "ciphertext");

    if (!iv || !mac || !ciphertext) {
      return undefined;
    }

    return {
      iv,
      mac,
      ciphertext,
    };
  }
}
