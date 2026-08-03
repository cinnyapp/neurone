# Matrix Key Backup

This document explains how to use the `BackupManager` and `KeyBackup` classes to create, enable, export, import, and restore end-to-end encryption (E2EE) room key backups.

---

# Overview

The key backup implementation consists of two main classes:

- **`BackupManager`** – Responsible for creating backup keys, enabling/disabling backups, validating backups, and sharing room key bundles.
- **`KeyBackup`** – Responsible for uploading, importing, exporting, and restoring encrypted room keys.

These classes wrap the Matrix Rust Crypto APIs to simplify key backup management.

---

# Prerequisites

Before using key backups, ensure you have:

- An initialized `OlmMachine`
- An initialized `OutgoingRequests`
- A valid Matrix backup version (`BackupVersionInfo`) obtained from your homeserver

Example:

```ts
const backupManager = new BackupManager(olmMachine, outgoingRequests);
```

---

# Creating a New Backup Key

Generate a new backup key pair:

```ts
const { publicKey, privateKey } = BackupManager.createBackupKey();
```

Returns:

```ts
{
    publicKey: "...",
    privateKey: "..."
}
```

- **publicKey** should be uploaded when creating the backup version on the homeserver.
- **privateKey** must be securely stored by the user. It is required for restoring backups.

---

# Saving an Existing Backup Key

If the user already has a backup recovery key:

```ts
await backupManager.saveDecryptionKey(keyBytes, backupVersionInfo);
```

This stores the backup decryption key inside the `OlmMachine`.

---

# Checking Whether a Backup Is Trusted

```ts
const trusted = await backupManager.trustedBackup(backupInfo);
```

Returns `true` if:

- the backup is cryptographically trusted, or
- the locally stored recovery key matches the backup's public key.

---

# Enabling Key Backup

After downloading the backup version from the homeserver:

```ts
const keyBackup = await backupManager.enableBackup(backupInfo);
```

This:

- validates the backup information
- enables backup support inside `OlmMachine`
- returns a `KeyBackup` instance for backup operations

---

# Disabling Key Backup

```ts
await backupManager.disableBackup();
```

Stops using the current backup.

---

# Uploading Room Keys

To upload locally stored room keys to the homeserver:

```ts
await keyBackup.backupRoomKeys();
```

This uploads any keys that have not yet been backed up.

---

# Restoring Room Keys from Server Backup

After downloading the encrypted backup payload from the homeserver:

```ts
await keyBackup.importBackup(roomToKeyBackup, (progress, total, failures) => {
  console.log(progress, total, failures);
});
```

This process:

1. retrieves the stored backup decryption key
2. decrypts every session
3. imports all recovered room keys into the local crypto store

---

# Typical Backup Flow

## Creating a New Backup

```text
Create backup key
        │
        ▼
Upload public key to homeserver
        │
        ▼
Enable backup
        │
        ▼
Backup room keys periodically
```

---

# Typical Restore Flow

```text
Download backup version
        │
        ▼
Store recovery key
        │
        ▼
Enable backup
        │
        ▼
Download encrypted room key backup
        │
        ▼
Import room keys
```

---

# Security Notes

- Never upload or transmit the backup **private key** unless explicitly restoring keys.
- Store the recovery key securely (password manager, secure storage, or offline backup).
- The backup public key alone cannot decrypt room keys.
- Always verify that a backup is trusted before restoring keys.
- Exported room keys should be encrypted before being stored outside the application.

---

# Summary

| Class           | Responsibility                                            |
| --------------- | --------------------------------------------------------- |
| `BackupManager` | Backup setup, trust verification, recovery key management |
| `KeyBackup`     | Uploading, restoring, and decrypting room keys            |

Together these classes provide a complete interface for managing Matrix end-to-end encryption key backups.
