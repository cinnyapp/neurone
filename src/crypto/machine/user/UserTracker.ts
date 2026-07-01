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
