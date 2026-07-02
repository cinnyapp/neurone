import {
  CollectStrategy,
  EncryptionInfo,
  RoomSettings,
  EncryptionAlgorithm as RustEncryptionAlgorithm,
  HistoryVisibility as RustHistoryVisibility,
  EncryptionSettings as RustEncryptionSettings,
  ShieldColor,
  ShieldStateCode,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import {
  DeviceCollectStrategy,
  EncryptionAlgorithm,
  EncryptionSettings,
  EncryptionShieldCode,
  EncryptionShieldColor,
  EventEncryptionInfo,
  HistoryVisibility,
  RoomEncryptionSettings,
} from "./types";

export function encryptionAlgorithmFromRust(
  algorithm: RustEncryptionAlgorithm,
): EncryptionAlgorithm | undefined {
  if (algorithm === RustEncryptionAlgorithm.MegolmV1AesSha2) {
    return "m.megolm.v1.aes-sha2";
  }

  if (algorithm === RustEncryptionAlgorithm.OlmV1Curve25519AesSha2) {
    return "m.olm.v1.curve25519-aes-sha2";
  }

  return undefined;
}

export function encryptionAlgorithmToRust(
  algorithm: EncryptionAlgorithm | undefined,
): RustEncryptionAlgorithm {
  if (algorithm === "m.megolm.v1.aes-sha2") {
    return RustEncryptionAlgorithm.MegolmV1AesSha2;
  }

  if (algorithm === "m.olm.v1.curve25519-aes-sha2") {
    return RustEncryptionAlgorithm.OlmV1Curve25519AesSha2;
  }

  return RustEncryptionAlgorithm.Unknown;
}

export function roomEncryptionSettingsFromRust(
  settings: RoomSettings,
): RoomEncryptionSettings {
  return {
    algorithm: encryptionAlgorithmFromRust(settings.algorithm),
    encryptStateEvents: settings.encryptStateEvents,
    onlyAllowTrustedDevices: settings.onlyAllowTrustedDevices,
    sessionRotationPeriodMessages: settings.sessionRotationPeriodMessages,
    sessionRotationPeriodMs: settings.sessionRotationPeriodMs,
  };
}

export function roomEncryptionSettingsToRust(
  settings: RoomEncryptionSettings,
): RoomSettings {
  const rustSettings = new RoomSettings();
  rustSettings.algorithm = encryptionAlgorithmToRust(settings.algorithm);
  rustSettings.encryptStateEvents = settings.encryptStateEvents;
  rustSettings.onlyAllowTrustedDevices = settings.onlyAllowTrustedDevices;
  rustSettings.sessionRotationPeriodMessages =
    settings.sessionRotationPeriodMessages;
  rustSettings.sessionRotationPeriodMs = settings.sessionRotationPeriodMs;

  return rustSettings;
}

export function encryptionShieldColorFromRust(
  color: ShieldColor,
): EncryptionShieldColor {
  if (color === ShieldColor.Red) return "red";
  if (color === ShieldColor.Grey) return "grey";
  return "none";
}

export function encryptionShieldCodeFromRust(
  code?: ShieldStateCode,
): EncryptionShieldCode | undefined {
  switch (code) {
    case ShieldStateCode.AuthenticityNotGuaranteed:
      return "authenticity-not-guaranteed";
    case ShieldStateCode.UnknownDevice:
      return "unknown-device";
    case ShieldStateCode.UnsignedDevice:
      return "unsigned-device";
    case ShieldStateCode.UnverifiedIdentity:
      return "unverified-identity";
    case ShieldStateCode.VerificationViolation:
      return "verification-violation";
    case ShieldStateCode.MismatchedSender:
      return "mismatched-sender";
  }
  return undefined;
}

export function eventEncryptionInfoFromRust(
  info: EncryptionInfo,
): EventEncryptionInfo {
  const shield = info.shieldState(false);

  return {
    sender: info.sender.toString(),
    deviceId: info.senderDevice?.toString(),
    claimedEd25519Key: info.senderClaimedEd25519Key,
    forwarder: info.forwarder?.toString(),
    forwardDeviceId: info.forwarderDevice?.toString(),
    shield: {
      code: encryptionShieldCodeFromRust(shield.code),
      color: encryptionShieldColorFromRust(shield.color),
      message: shield.message,
    },
  };
}

export function historyVisibilityToRust(
  visibility: HistoryVisibility,
): RustHistoryVisibility {
  switch (visibility) {
    case "invited":
      return RustHistoryVisibility.Invited;
    case "joined":
      return RustHistoryVisibility.Joined;
    case "shared":
      return RustHistoryVisibility.Shared;
    case "world_readable":
      return RustHistoryVisibility.WorldReadable;
  }
}

export function deviceCollectStrategyToRust(
  strategy: DeviceCollectStrategy,
): CollectStrategy {
  switch (strategy) {
    case "all-devices":
      return CollectStrategy.allDevices();
    case "error-on-verified-user-problems":
      return CollectStrategy.errorOnUnverifiedUserProblem();
    case "identity-based":
      return CollectStrategy.identityBasedStrategy();
    case "only-trusted-devices":
      return CollectStrategy.onlyTrustedDevices();
  }
}

export function encryptionSettingsToRust(
  encryptionSettings: EncryptionSettings,
): RustEncryptionSettings {
  const rustEncSettings = new RustEncryptionSettings();
  rustEncSettings.algorithm = encryptionAlgorithmToRust(
    encryptionSettings.algorithm,
  );
  rustEncSettings.encryptStateEvents = encryptionSettings.encryptStateEvents;
  rustEncSettings.rotationPeriodMessages = BigInt(
    encryptionSettings.rotationPeriodMessages,
  );
  rustEncSettings.rotationPeriod = BigInt(encryptionSettings.rotationPeriod);
  rustEncSettings.sharingStrategy = deviceCollectStrategyToRust(
    encryptionSettings.sharingStrategy,
  );
  rustEncSettings.historyVisibility = historyVisibilityToRust(
    encryptionSettings.historyVisibility,
  );

  return rustEncSettings;
}
