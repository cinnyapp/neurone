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

import {
  ToDeviceEncryptionInfo as RustToDeviceEncryptionInfo,
  ToDeviceUnableToDecryptInfo as RustToDeviceUnableToDecryptInfo,
  ToDeviceUnableToDecryptReason as RustUTDReason,
  DecryptedToDeviceEvent as RustDecryptedToDeviceEvent,
  PlainTextToDeviceEvent as RustPlainTextToDeviceEvent,
  InvalidToDeviceEvent as RustInvalidToDeviceEvent,
  UTDToDeviceEvent as RustUTDToDeviceEvent,
  ProcessedToDeviceEvent as RustProcessedToDeviceEvent,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { ToDeviceEvent } from "../../../api/types";

export class ToDeviceEncryptionInfo {
  private readonly info: RustToDeviceEncryptionInfo;

  constructor(info: RustToDeviceEncryptionInfo) {
    this.info = info;
  }

  get sender(): string {
    return this.info.sender.toString();
  }

  get deviceId(): string | undefined {
    return this.info.senderDevice?.toString();
  }

  get verified(): boolean {
    return this.info.isSenderVerified();
  }

  get curve25519Key(): string {
    return this.info.senderCurve25519Key;
  }
}

export type ToDeviceUTDReason =
  | "decryption-failure"
  | "unverified-sender-device"
  | "no-olm-machine"
  | "encryption-is-disabled";

export class ToDeviceUTDInfo {
  private readonly info: RustToDeviceUnableToDecryptInfo;

  constructor(info: RustToDeviceUnableToDecryptInfo) {
    this.info = info;
  }

  get reason(): ToDeviceUTDReason {
    switch (this.info.reason) {
      case RustUTDReason.DecryptionFailure:
        return "decryption-failure";
      case RustUTDReason.UnverifiedSenderDevice:
        return "unverified-sender-device";
      case RustUTDReason.NoOlmMachine:
        return "no-olm-machine";
      case RustUTDReason.EncryptionIsDisabled:
        return "encryption-is-disabled";
    }
  }
}

export class ToDeviceDecrypted {
  public readonly encryptionInfo: ToDeviceEncryptionInfo;

  public readonly event: ToDeviceEvent;

  constructor(rustEvent: RustDecryptedToDeviceEvent) {
    this.encryptionInfo = new ToDeviceEncryptionInfo(rustEvent.encryptionInfo);
    this.event = JSON.parse(rustEvent.rawEvent);
  }
}

export class ToDevicePlainText {
  public readonly event: ToDeviceEvent;

  constructor(rustEvent: RustPlainTextToDeviceEvent) {
    this.event = JSON.parse(rustEvent.rawEvent);
  }
}

export class ToDeviceInvalid {
  public readonly event: ToDeviceEvent;
  constructor(rustEvent: RustInvalidToDeviceEvent) {
    this.event = JSON.parse(rustEvent.rawEvent);
  }
}

export class ToDeviceUTD {
  public readonly info: ToDeviceUTDInfo;

  public readonly event: ToDeviceEvent;

  constructor(rustEvent: RustUTDToDeviceEvent) {
    this.info = new ToDeviceUTDInfo(rustEvent.utdInfo);
    this.event = JSON.parse(rustEvent.rawEvent);
  }
}

export type ProcessedToDeviceEvent =
  | ToDeviceDecrypted
  | ToDevicePlainText
  | ToDeviceInvalid
  | ToDeviceUTD;

export function processedToDeviceEventFromRust(
  rustEvent: RustProcessedToDeviceEvent,
): ProcessedToDeviceEvent {
  if (rustEvent instanceof RustDecryptedToDeviceEvent) {
    return new ToDeviceDecrypted(rustEvent);
  }
  if (rustEvent instanceof RustPlainTextToDeviceEvent) {
    return new ToDevicePlainText(rustEvent);
  }
  if (rustEvent instanceof RustInvalidToDeviceEvent) {
    return new ToDeviceInvalid(rustEvent);
  }
  if (rustEvent instanceof RustUTDToDeviceEvent) {
    return new ToDeviceUTD(rustEvent);
  }

  throw new Error("Unknown ProcessedToDeviceEvent type");
}
