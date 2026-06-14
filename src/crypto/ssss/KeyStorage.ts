import { ObjectReader } from "../../utils";
import { PASSPHRASE_ALGORITHM_PBKDF2, PassphraseInfo } from "./Passphrase";

export const SECRET_STORAGE_ALGORITHM_V1_AES_HMAC_SHA2 =
  "m.secret_storage.v1.aes-hmac-sha2";

export type KeyDescription = {
  name?: string;
  algorithm: string;
  passphrase?: PassphraseInfo;
};

export type AesHmacSha2KeyDescription = KeyDescription & {
  algorithm: typeof SECRET_STORAGE_ALGORITHM_V1_AES_HMAC_SHA2;
  iv?: string;
  mac?: string;
};

export type DefaultKey = {
  key: string;
};

export class KeyStorage {
  private static parsePassphrase(data: object): PassphraseInfo | undefined {
    const algo = ObjectReader.string(data, "algorithm");
    const salt = ObjectReader.string(data, "salt");
    const itr = ObjectReader.number(data, "iterations");
    const bits = ObjectReader.number(data, "bits");

    if (algo === undefined || salt === undefined || itr === undefined) {
      return undefined;
    }
    if (algo !== PASSPHRASE_ALGORITHM_PBKDF2) return undefined;

    const passphrase: PassphraseInfo = {
      algorithm: algo,
      salt,
      iterations: itr,
      bits,
    };

    return passphrase;
  }

  private static parseAesHmacSha2KeyDescription(
    data: unknown,
  ): AesHmacSha2KeyDescription | undefined {
    const algorithm = ObjectReader.string(data, "algorithm");
    if (!algorithm || algorithm !== SECRET_STORAGE_ALGORITHM_V1_AES_HMAC_SHA2)
      return undefined;

    const passphrase = ObjectReader.object(data, "passphrase");

    const desc: AesHmacSha2KeyDescription = {
      algorithm,
      name: ObjectReader.string(data, "name"),
      iv: ObjectReader.string(data, "iv"),
      mac: ObjectReader.string(data, "mac"),
      passphrase: passphrase && KeyStorage.parsePassphrase(passphrase),
    };

    return desc;
  }

  static defaultKeyIdentifier(): string {
    return "m.secret_storage.default_key";
  }

  static keyIdentifier(keyId: string): string {
    return `m.secret_storage.key.${keyId}`;
  }

  static getDefaultKeyId(data: object): string | undefined {
    return ObjectReader.string(data, "key");
  }

  static getKeyDescription(
    data: unknown,
  ): AesHmacSha2KeyDescription | undefined {
    return KeyStorage.parseAesHmacSha2KeyDescription(data);
  }
}
