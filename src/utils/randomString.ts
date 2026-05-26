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
