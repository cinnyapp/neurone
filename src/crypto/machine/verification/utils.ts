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

import { VerificationMethod as RustVerificationMethod } from "@matrix-org/matrix-sdk-crypto-wasm";
import { VerificationMethod } from "./types";

export function verificationMethodToRust(
  verificationMethod: VerificationMethod,
): RustVerificationMethod {
  switch (verificationMethod) {
    case "m.sas.v1":
      return RustVerificationMethod.SasV1;
    case "m.qr_code.scan.v1":
      return RustVerificationMethod.QrCodeScanV1;
    case "m.qr_code.show.v1":
      return RustVerificationMethod.QrCodeShowV1;
    case "m.reciprocate.v1":
      return RustVerificationMethod.ReciprocateV1;
  }
}

export function verificationMethodFromRust(
  verificationMethod: RustVerificationMethod,
): VerificationMethod {
  switch (verificationMethod) {
    case RustVerificationMethod.SasV1:
      return "m.sas.v1";
    case RustVerificationMethod.QrCodeScanV1:
      return "m.qr_code.scan.v1";
    case RustVerificationMethod.QrCodeShowV1:
      return "m.qr_code.show.v1";
    case RustVerificationMethod.ReciprocateV1:
      return "m.reciprocate.v1";
  }
}
