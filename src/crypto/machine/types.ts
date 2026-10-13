/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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

export type HistoryVisibility =
  | "world_readable"
  | "shared"
  | "invited"
  | "joined";

export type DeviceCollectStrategy =
  | "all-devices"
  | "error-on-verified-user-problems"
  | "identity-based"
  | "only-trusted-devices";

export type EncryptionSettings = {
  algorithm: EncryptionAlgorithm;
  historyVisibility: HistoryVisibility;
  encryptStateEvents?: boolean;
  rotationPeriodMessages?: number;
  rotationPeriod?: number;
  sharingStrategy?: DeviceCollectStrategy;
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

export interface SignedObject {
  [key: string]: unknown;

  signatures?: Record<string, Record<string, string>>;
  unsigned?: Record<string, unknown>;
}
