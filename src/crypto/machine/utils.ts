import { EncryptionAlgorithm as RustEncryptionAlgorithm } from "@matrix-org/matrix-sdk-crypto-wasm";
import { EncryptionAlgorithm } from "./types";

export function encryptionAlgorithmFromRust(
  algorithm: RustEncryptionAlgorithm,
): EncryptionAlgorithm | undefined {
  if (algorithm === RustEncryptionAlgorithm.MegolmV1AesSha2) {
    return "m.megolm.v1.aes-sha2";
  }

  if (algorithm === RustEncryptionAlgorithm.OlmV1Curve25519AesSha2) {
    return "m.olm.v1.curve25519-aes-sha2";
  }

  return undefined;
}
