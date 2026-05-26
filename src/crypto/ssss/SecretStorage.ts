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
    console.log(encData);

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
