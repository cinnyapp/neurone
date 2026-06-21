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
