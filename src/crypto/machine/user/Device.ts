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

import { Device as RustDevice } from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequests } from "../OutgoingRequests";
import { DeviceCollectStrategy, EncryptionAlgorithm } from "../types";
import {
  deviceCollectStrategyToRust,
  encryptionAlgorithmFromRust,
} from "../utils";

export class Device {
  private readonly outgoingRequests: OutgoingRequests;

  private readonly device: RustDevice;

  constructor(outgoingRequests: OutgoingRequests, device: RustDevice) {
    this.outgoingRequests = outgoingRequests;
    this.device = device;
  }

  get userId(): string {
    return this.device.userId.toString();
  }

  get deviceId(): string {
    return this.device.deviceId.toString();
  }

  get displayName(): string | undefined {
    return this.device.displayName;
  }

  get verified(): boolean {
    return this.device.isVerified();
  }

  get crossSigningTrusted(): boolean {
    return this.device.isCrossSigningTrusted();
  }

  get locallyTrusted(): boolean {
    return this.device.isLocallyTrusted();
  }

  get crossSignedByOwner(): boolean {
    return this.device.isCrossSignedByOwner();
  }

  get blacklisted(): boolean {
    return this.device.isBlacklisted();
  }

  get dehydrated(): boolean {
    return this.device.isDehydrated;
  }

  get algorithms(): EncryptionAlgorithm[] {
    return this.device.algorithms
      .map((alg) => encryptionAlgorithmFromRust(alg))
      .filter((alg) => !!alg);
  }

  getEncryptionKey(): string | undefined {
    return this.device.curve25519Key?.toBase64();
  }

  getSigningKey(): string | undefined {
    return this.device.ed25519Key?.toBase64();
  }

  async verify(): Promise<Response> {
    const request = await this.device.verify();
    return await this.outgoingRequests.send(request);
  }

  async encryptToDeviceEvent(
    eventType: string,
    content: object,
    strategy?: DeviceCollectStrategy,
  ): Promise<string> {
    const contentStr = this.device.encryptToDeviceEvent(
      eventType,
      content,
      strategy ? deviceCollectStrategyToRust(strategy) : null,
    );
    return contentStr;
  }
}
