# Server-Side Secret Storage

This module helps you securely manage Matrix Secrets Storage (SSSS).

Spec:
https://spec.matrix.org/v1.17/client-server-api/#secrets

The module handles:

- Creating and managing recovery keys
- Deriving keys from passphrases
- Encrypting and decrypting secrets
- Generating and validating key metadata

It does **not** perform any network requests.  
You are responsible for storing and retrieving account data from the Matrix server.

## Modules

- `Passphrase.ts`
  Create and derive keys using human-readable passphrases

- `AesHmacSha2.ts`
  Encrypt/decrypt secrets using `m.secret_storage.v1.aes-hmac-sha2`

- `RecoveryKey.ts`
  Encode/decode recovery keys into a user-friendly format

- `KeyStorage.ts`
  Utilities for managing secret storage key metadata

- `SecretStorage.ts`
  Utilities for working with encrypted secret payloads

## Example Workflow

We will store two secret agent names:

1. Mr. X
2. Mr. Y

### Create a private key to store/access our secret

Lets create a passphrase

```ts
// a more human friendly passphrase optionally provided by user
const recoveryPhrase;

// long private key & passphrase info to regenerate recovery key from passphrase
const { key, passphrase } = await Passphrase.create(recoveryPhrase);

// alternative way to create private key if user doesn't use passphrase option
const key = AesHmacSha2.generateRawKey();

// private key in user readable format often called as recovery key
// this should be given to user for later use
const recoveryKey = RecoveryKey.encode(key);
```

The `key` will be our private key to secure our secrets.

### Store private key description

Before we start encrypting our secret with this private key, we must create the description of the key. This will help in:

1. Retrieve the key from passphrase. (`passphrase`)
2. To identify that a secret is secured with this key. (`keyId`)
3. To verify the provided key. (`iv`, `mac`)

```ts
// what we have from previous step
const key, passphrase;

const { iv, mac } = await AesHmacSha2.driveKeyMetaData(key);

const keyDescription: AesHmacSha2KeyDescription = {
  algorithm: SecretStorageAlgorithm.V1_AES_HMAC_SHA2,
  passphrase,
  iv,
  mac,
};

// generate a unique keyId as identifier of this key
const keyId = randomString(16);

const keyAccountDataType = KeyStorage.keyIdentifier(keyId);
```

Now we can save it in account data using the `keyAccountDataType` as type and `keyDescription` as content.

### Encrypting our secret names

Now that we have a private key ready to use. We will encrypt our names.

```ts
const agentName1 = "Mr. X";
const agentName2 = "Mr. Y";

// identifier for our secrets
// aka: account data type for content
const secret1Identifier = "my.agent.1";
const secret2Identifier = "my.agent.2";

// variables from previous step
const key, keyId;

const s1EncryptedData = await AesHmacSha2.encrypt(
  key,
  secret1Identifier,
  agentName1,
);
const s2EncryptedData = await AesHmacSha2.encrypt(
  key,
  secret2Identifier,
  agentName2,
);

const secret1: Secret = {
  encrypted: {
    [keyId]: s1EncryptedData,
  },
};
const secret2: Secret = {
  encrypted: {
    [keyId]: s2EncryptedData,
  },
};
```

Now we can save these in our account data with type `secret1Identifier` and `secret2Identifier` to store `secret1` and `secret2` as content respectively.

### Reading back our secrets

We have them stored on to the server safely. Now is the time to read them.

```ts
// the secret identifier that the program knows
const secret1Identifier, secret2Identifier;

// fetched from account data with identifiers
const secret1, secret1;

// the identifier that program knowns or from default key data
const keyId;

const s1EncryptedData = SecretStorage.getEncryptedData(keyId, secret1);
const s2EncryptedData = SecretStorage.getEncryptedData(keyId, secret2);

// ask user for recoveryKey or recoveryPhrase
const recoveryKey, recoveryPhrase;

// fetch `keyDescription` for `keyId` from account data.
const keyAccountDataType = KeyStorage.keyIdentifier(keyId);
const keyData: unknown; // fetched from account data;
const { iv, mac, passphrase } = KeyStorage.getKeyDescription(keyData);

const key = RecoveryKey.decode(recoveryKey);
// or
const key = Passphrase.derive(recoveryPhrase, passphrase);

// generate metaData i.e `mac` with the given key and previously stored bits
const { mac: regeneratedMac } = await AesHmacSha2.driveKeyMetaData(key, iv);

// compare previous `mac` with `regeneratedMac`
// if both are equal we are good to go otherwise prompt the user;

const agent1Name = await AesHmacSha2.decrypt(
  key,
  secret1Identifier,
  s1EncryptedData,
);
const agent2Name = await AesHmacSha2.decrypt(
  key,
  secret2Identifier,
  s2EncryptedData,
);

console.log(agent1Name); // Mr. X
console.log(agent2Name); // Mr. Y
```
