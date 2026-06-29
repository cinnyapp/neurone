export type EncryptionAlgorithm =
  | "m.megolm.v1.aes-sha2"
  | "m.olm.v1.curve25519-aes-sha2";

export type RoomKeyInfo = {
  algorithm: EncryptionAlgorithm;
  roomId: string;
  senderKey: string;
  sessionId: string;
};

export type RoomKeyWithheldInfo = {
  algorithm: EncryptionAlgorithm;
  roomId: string;
  sender: string;
  sessionId: string;
  withheldCode: string;
};

export type RoomEncryptionSettings = {
  algorithm?: EncryptionAlgorithm;
  encryptStateEvents: boolean;
  onlyAllowTrustedDevices: boolean;
  sessionRotationPeriodMessages?: number;
  sessionRotationPeriodMs?: number;
};

export type EncryptionShieldColor = "red" | "grey" | "none";

export type EncryptionShieldCode =
  | "authenticity-not-guaranteed"
  | "unknown-device"
  | "unsigned-device"
  | "unverified-identity"
  | "verification-violation"
  | "mismatched-sender";

export type EncryptionShield = {
  color: EncryptionShieldColor;
  code?: EncryptionShieldCode;
  message?: string;
};

export type EventEncryptionInfo = {
  sender: string;
  deviceId?: string;
  claimedEd25519Key?: string;
  forwarder?: string;
  forwardDeviceId?: string;
  shield: EncryptionShield;
};
