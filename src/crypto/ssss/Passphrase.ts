import { randomString } from "../../utils";

export enum PassphraseAlgorithm {
  PBKDF2 = "m.pbkdf2",
}

export type PassphraseInfo = {
  algorithm: PassphraseAlgorithm.PBKDF2;
  salt: string;
  iterations: number;
  bits?: number;
};

const DEFAULT_ITERATIONS = 500000;
const DEFAULT_BITS = 256;

export class Passphrase {
  static async create(
    passphrase: string,
    options?: {
      iterations?: number;
      bits?: number;
      salt?: string;
    },
  ): Promise<{
    key: Uint8Array;
    passphrase: PassphraseInfo;
  }> {
    const iterations = options?.iterations ?? DEFAULT_ITERATIONS;
    const bits = options?.bits ?? DEFAULT_BITS;
    const salt = options?.salt ?? randomString(16);

    const encoder = new TextEncoder();

    const keyMaterial = await globalThis.crypto.subtle.importKey(
      "raw",
      encoder.encode(passphrase),
      "PBKDF2",
      false,
      ["deriveBits"],
    );

    const derivedBits = await globalThis.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-512",
        salt: encoder.encode(salt),
        iterations,
      },
      keyMaterial,
      bits,
    );

    return {
      key: new Uint8Array(derivedBits),
      passphrase: {
        algorithm: PassphraseAlgorithm.PBKDF2,
        salt,
        iterations,
        bits,
      },
    };
  }

  static async derive(
    passphrase: string,
    info: PassphraseInfo,
  ): Promise<Uint8Array> {
    const { key } = await Passphrase.create(passphrase, {
      iterations: info.iterations,
      salt: info.salt,
      bits: info.bits,
    });

    return key;
  }
}
