import { Device as RustDevice } from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequests } from "../OutgoingRequests";
import { EncryptionAlgorithm } from "../types";
import { encryptionAlgorithmFromRust } from "../utils";

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

  async verify(): Promise<void> {
    const request = await this.device.verify();
    await this.outgoingRequests.send(request);
  }
}
