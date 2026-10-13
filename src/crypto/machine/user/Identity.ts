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
  OtherUserIdentity,
  OwnUserIdentity,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequests } from "../OutgoingRequests";

export class OwnIdentity {
  private readonly outgoingRequests: OutgoingRequests;

  private readonly identity: OwnUserIdentity;

  constructor(outgoingRequests: OutgoingRequests, identity: OwnUserIdentity) {
    this.outgoingRequests = outgoingRequests;
    this.identity = identity;
  }

  get masterKey(): string {
    return this.identity.masterKey;
  }

  get selfSigningKey(): string {
    return this.identity.selfSigningKey;
  }

  get userSigningKey(): string {
    return this.identity.userSigningKey;
  }

  get verified(): boolean {
    return this.identity.isVerified();
  }

  get wasVerified(): boolean {
    return this.identity.wasPreviouslyVerified();
  }

  async verify(): Promise<Response> {
    const request = await this.identity.verify();
    return await this.outgoingRequests.send(request);
  }

  async withdrawVerification(): Promise<void> {
    await this.identity.withdrawVerification();
  }
}

export class OthersIdentity {
  private readonly outgoingRequests: OutgoingRequests;

  private readonly identity: OtherUserIdentity;

  constructor(outgoingRequests: OutgoingRequests, identity: OtherUserIdentity) {
    this.outgoingRequests = outgoingRequests;
    this.identity = identity;
  }

  get masterKey(): string {
    return this.identity.masterKey;
  }

  get selfSigningKey(): string {
    return this.identity.selfSigningKey;
  }

  get verified(): boolean {
    return this.identity.isVerified();
  }

  get wasVerified(): boolean {
    return this.identity.wasPreviouslyVerified();
  }

  async verify(): Promise<void> {
    const request = await this.identity.verify();
    await this.outgoingRequests.send(request);
  }

  async withdrawVerification(): Promise<void> {
    await this.identity.withdrawVerification();
  }
}
