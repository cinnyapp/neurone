import { Base64 } from "../../utils";

export type AesHmacSha2EncryptedData = {
  ciphertext: string;
  mac: string;
  iv: string;
};
// string of zeroes, for driving the key check
const ZERO_STR =
  "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0";

export class AesHmacSha2 {
  /**
   * Derive AES and HMAC keys from the secret storage key.
   *
   * Matrix spec:
   * - HKDF-SHA-256
   * - salt = 32 zero bytes
   * - info = secret name
   * - first 32 bytes = AES key
   * - next 32 bytes = HMAC key
   */
  private static async deriveKeys(
    key: Uint8Array,
    name: string,
  ): Promise<{
    aesKey: CryptoKey;
    hmacKey: CryptoKey;
  }> {
    const hkdfKey = await globalThis.crypto.subtle.importKey(
      "raw",
      key,
      "HKDF",
      false,
      ["deriveBits"],
    );

    const derived = new Uint8Array(
      await globalThis.crypto.subtle.deriveBits(
        {
          name: "HKDF",
          hash: "SHA-256",
          salt: new Uint8Array(32),
          info: new TextEncoder().encode(name),
        },
        hkdfKey,
        512,
      ),
    );

    const aesKeyBytes = derived.slice(0, 32);
    const hmacKeyBytes = derived.slice(32);

    const aesKey = await globalThis.crypto.subtle.importKey(
      "raw",
      aesKeyBytes,
      {
        name: "AES-CTR",
      },
      false,
      ["encrypt", "decrypt"],
    );

    const hmacKey = await globalThis.crypto.subtle.importKey(
      "raw",
      hmacKeyBytes,
      {
        name: "HMAC",
        hash: "SHA-256",
      },
      false,
      ["sign", "verify"],
    );

    return {
      aesKey,
      hmacKey,
    };
  }

  /**
   * Generate Matrix-compatible AES-CTR IV.
   *
   * Bit 63 must be cleared to avoid implementation differences.
   */
  private static generateIv(): Uint8Array {
    const iv = globalThis.crypto.getRandomValues(new Uint8Array(16));

    // Clear bit 63.
    iv[8] &= 0x7f;

    return iv;
  }

  static generateRawKey(): Uint8Array {
    const key = new Uint8Array(32);
    globalThis.crypto.getRandomValues(key);

    return key;
  }

  static async encrypt(
    key: Uint8Array,
    name: string,
    secret: string,
    ivStr?: string,
  ): Promise<AesHmacSha2EncryptedData> {
    const { aesKey, hmacKey } = await this.deriveKeys(key, name);

    const iv = ivStr ? Base64.decode(ivStr) : this.generateIv();

    const plaintext = new TextEncoder().encode(secret);

    const ciphertext = new Uint8Array(
      await globalThis.crypto.subtle.encrypt(
        {
          name: "AES-CTR",
          counter: iv,
          length: 64,
        },
        aesKey,
        plaintext,
      ),
    );

    const mac = new Uint8Array(
      await globalThis.crypto.subtle.sign("HMAC", hmacKey, ciphertext),
    );

    return {
      ciphertext: Base64.encode(ciphertext),
      mac: Base64.encode(mac),
      iv: Base64.encode(iv),
    };
  }

  static async decrypt(
    key: Uint8Array,
    name: string,
    data: AesHmacSha2EncryptedData,
  ): Promise<string> {
    const { aesKey, hmacKey } = await this.deriveKeys(key, name);

    const iv = Base64.decode(data.iv);
    const ciphertext = Base64.decode(data.ciphertext);
    const mac = Base64.decode(data.mac);

    const valid = await globalThis.crypto.subtle.verify(
      "HMAC",
      hmacKey,
      mac,
      ciphertext,
    );

    if (!valid) {
      throw new Error("Invalid MAC");
    }

    const plaintext = await globalThis.crypto.subtle.decrypt(
      {
        name: "AES-CTR",
        counter: iv,
        length: 64,
      },
      aesKey,
      ciphertext,
    );

    return new TextDecoder().decode(plaintext);
  }

  static async verify(
    key: Uint8Array,
    name: string,
    data: AesHmacSha2EncryptedData,
  ): Promise<boolean> {
    const { hmacKey } = await this.deriveKeys(key, name);

    const ciphertext = Base64.decode(data.ciphertext);
    const mac = Base64.decode(data.mac);

    return globalThis.crypto.subtle.verify("HMAC", hmacKey, mac, ciphertext);
  }

  /**
   * https://spec.matrix.org/v1.17/client-server-api/#msecret_storagev1aes-hmac-sha2
   * @param key
   * @param iv
   */
  static async driveKeyMetaData(
    key: Uint8Array,
    ivStr?: string,
  ): Promise<{
    iv: string;
    mac: string;
  }> {
    const { iv, mac } = await AesHmacSha2.encrypt(key, "", ZERO_STR, ivStr);

    return {
      iv,
      mac,
    };
  }
}
