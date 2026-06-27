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
