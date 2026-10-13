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

export class ObjectReader {
  static isRecord(object: unknown): object is Record<string, unknown> {
    return (
      typeof object === "object" && object !== null && !Array.isArray(object)
    );
  }

  static string(object: unknown, key: string): string | undefined {
    return ObjectReader.isRecord(object) && typeof object[key] === "string"
      ? object[key]
      : undefined;
  }

  static number(object: unknown, key: string): number | undefined {
    return ObjectReader.isRecord(object) && typeof object[key] === "number"
      ? object[key]
      : undefined;
  }

  static boolean(object: unknown, key: string): boolean | undefined {
    return ObjectReader.isRecord(object) && typeof object[key] === "boolean"
      ? object[key]
      : undefined;
  }

  static null(object: unknown, key: string): null | undefined {
    return ObjectReader.isRecord(object) && object[key] === null
      ? null
      : undefined;
  }

  static object(object: unknown, key: string): object | undefined {
    return ObjectReader.isRecord(object) && ObjectReader.isRecord(object[key])
      ? object[key]
      : undefined;
  }

  static array(object: unknown, key: string): unknown[] | undefined {
    return ObjectReader.isRecord(object) && Array.isArray(object[key])
      ? object[key]
      : undefined;
  }
}
