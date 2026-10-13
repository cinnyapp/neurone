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
  DeviceId,
  OlmMachine,
  OwnUserIdentity,
  UserId,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { Device } from "./Device";
import { OutgoingRequests } from "../OutgoingRequests";
import { OthersIdentity, OwnIdentity } from "./Identity";

export class UserTracker {
  private readonly olmMachine: OlmMachine;

  private readonly outgoingRequests: OutgoingRequests;

  constructor(olmMachine: OlmMachine, outgoingRequests: OutgoingRequests) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = outgoingRequests;
  }

  async getDevice(
    userId: string,
    deviceId: string,
  ): Promise<Device | undefined> {
    const device = await this.olmMachine.getDevice(
      new UserId(userId),
      new DeviceId(deviceId),
    );
    if (!device) return undefined;
    return new Device(this.outgoingRequests, device);
  }

  async getUserDevices(userId: string): Promise<Device[]> {
    const deviceList = await this.olmMachine.getUserDevices(new UserId(userId));

    return deviceList
      .devices()
      .map((device) => new Device(this.outgoingRequests, device));
  }

  async getIdentity(
    userId: string,
  ): Promise<OwnIdentity | OthersIdentity | undefined> {
    const identity = await this.olmMachine.getIdentity(new UserId(userId));
    if (!identity) return undefined;

    if (identity instanceof OwnUserIdentity)
      return new OwnIdentity(this.outgoingRequests, identity);
    return new OthersIdentity(this.outgoingRequests, identity);
  }

  async getAll(): Promise<string[]> {
    const users = await this.olmMachine.trackedUsers();
    return Array.from(users).map((u) => u.toString());
  }

  /**
   * @param users User IDs whose devices need to be tracked for encryption
   */
  async track(users: string[]): Promise<void> {
    await this.olmMachine.updateTrackedUsers(
      users.map((userId) => new UserId(userId)),
    );
  }

  async markAllAsDirty(): Promise<void> {
    await this.olmMachine.markAllTrackedUsersAsDirty();
  }
}
