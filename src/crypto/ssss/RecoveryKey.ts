import bs58 from "bs58";

const PREFIX = new Uint8Array([0x8b, 0x01]);
const KEY_LENGTH = 32;

/**
 * Matrix Recovery Key encoder/decoder.
 *
 * Implements the format defined in:
 * https://spec.matrix.org/v1.17/appendices/#cryptographic-key-representation
 *
 * A recovery key is a human-readable representation of a 32-byte secret key.
 * It includes:
 * - A fixed prefix (0x8B 0x01)
 * - The raw 32-byte secret key
 * - A single-byte XOR parity checksum
 * - Base58 encoding (Bitcoin alphabet)
 * - Optional grouping with spaces for readability
 *
 * This format is used to safely represent cryptographic keys in UI
 * and detect user input errors via checksum validation.
 */
export class RecoveryKey {
  /**
   * Encodes a 32-byte secret key into a Matrix-compatible recovery key string.
   *
   * Steps:
   * 1. Prefix key with 0x8B 0x01
   * 2. Compute XOR parity over all bytes
   * 3. Append parity byte
   * 4. Encode using Base58 (bs58)
   * 5. Format with spaces every 4 characters for readability
   *
   * @param key - Raw 32-byte secret storage key
   * @returns Human-readable recovery key string
   * @throws Error if key is not 32 bytes
   */
  static encode(key: Uint8Array<ArrayBuffer>): string {
    if (key.length !== KEY_LENGTH) {
      throw new Error("Invalid key length");
    }

    const data = new Uint8Array(PREFIX.length + key.length);
    data.set(PREFIX, 0);
    data.set(key, PREFIX.length);

    let parity = 0;
    for (const b of data) {
      parity ^= b;
    }

    const full = new Uint8Array(data.length + 1);
    full.set(data, 0);
    full[full.length - 1] = parity;

    const encoded = bs58.encode(full);

    return encoded.match(/.{1,4}/g)?.join(" ") ?? encoded;
  }

  /**
   * Decodes a Matrix recovery key string back into a raw 32-byte secret key.
   *
   * Steps:
   * 1. Remove whitespace
   * 2. Base58 decode
   * 3. Validate prefix (0x8B 0x01)
   * 4. Validate XOR parity checksum
   * 5. Extract and return raw key
   *
   * @param recoveryKey - Human-readable recovery key string
   * @returns Raw 32-byte secret storage key
   * @throws Error if format, prefix, or checksum is invalid
   */
  static decode(recoveryKey: string): Uint8Array<ArrayBuffer> {
    const cleaned = recoveryKey.replace(/\s+/g, "");

    const decoded = bs58.decode(cleaned);

    if (decoded.length !== KEY_LENGTH + 3) {
      throw new Error("Invalid recovery key length");
    }

    const prefix = decoded.slice(0, 2);
    const key = decoded.slice(2, 34);
    const parity = decoded[34];

    if (prefix[0] !== 0x8b || prefix[1] !== 0x01) {
      throw new Error("Invalid recovery key prefix");
    }

    let check = 0;
    for (let i = 0; i < decoded.length - 1; i++) {
      check ^= decoded[i];
    }

    if (check !== parity) {
      throw new Error("Invalid recovery key checksum");
    }

    return key;
  }
}
