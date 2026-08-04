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
