import {
  DeviceId,
  OlmMachine,
  RoomId,
  UserId,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { ClientEventWithoutRoomId, ToDeviceEvent } from "../../../api/types";
import { OutgoingRequests } from "../OutgoingRequests";
import { VerificationMethod } from "./types";
import { verificationMethodToRust } from "./utils";
import { OutboundVerification } from "./OutboundVerification";
import { InboundVerification } from "./InboundVerification";

export class VerificationManager {
  private readonly olmMachine: OlmMachine;

  private readonly outgoingRequests: OutgoingRequests;

  constructor(olmMachine: OlmMachine, outgoingRequests: OutgoingRequests) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = outgoingRequests;
  }

  static isRelatedEvent(event: ClientEventWithoutRoomId): boolean {
    switch (event.type) {
      case "m.key.verification.request":
      case "m.key.verification.ready":
      case "m.key.verification.start":
      case "m.key.verification.done":
      case "m.key.verification.cancel":
      case "m.key.verification.accept":
      case "m.key.verification.key":
      case "m.key.verification.mac":
        return true;

      case "m.room.message":
        return (
          "msgtype" in event.content &&
          event.content.msgtype === "m.key.verification.request"
        );
    }

    return false;
  }

  static isRequestEvent(event: ClientEventWithoutRoomId): boolean {
    return (
      event.type === "m.room.message" &&
      "msgtype" in event.content &&
      event.content.msgtype === "m.key.verification.request"
    );
  }

  async receiveMessageEvent(
    roomId: string,
    event: ClientEventWithoutRoomId,
    onVerificationRequest: (
      verificationFlow: OutboundVerification | InboundVerification,
    ) => void,
  ) {
    if (!VerificationManager.isRelatedEvent(event)) {
      return;
    }

    if (VerificationManager.isRequestEvent(event)) {
      // makes sure we have device keys of particular user
      // before starting the verification process.
      await this.outgoingRequests.queryKeys([event.sender]);
    }

    await this.olmMachine.receiveVerificationEvent(
      JSON.stringify(event),
      new RoomId(roomId),
    );

    await this.outgoingRequests.processAll();

    if (VerificationManager.isRequestEvent(event)) {
      const verificationRequest = this.olmMachine.getVerificationRequest(
        new UserId(event.sender),
        event.event_id,
      );

      if (verificationRequest) {
        const verificationFlow = verificationRequest.weStarted()
          ? new OutboundVerification(this.outgoingRequests, verificationRequest)
          : new InboundVerification(this.outgoingRequests, verificationRequest);

        onVerificationRequest(verificationFlow);
      }
    }
  }

  receiveToDeviceEvent(
    event: ToDeviceEvent,
    onVerificationRequest: (
      verificationFlow: OutboundVerification | InboundVerification,
    ) => void,
  ): void {
    if (event.type !== "m.key.verification.request") return;

    const { sender, content } = event;
    const txnId =
      "transaction_id" in content ? content.transaction_id : undefined;
    if (typeof txnId !== "string") return;

    const verificationRequest = this.olmMachine.getVerificationRequest(
      new UserId(sender),
      txnId,
    );
    if (verificationRequest) {
      const verificationFlow = verificationRequest.weStarted()
        ? new OutboundVerification(this.outgoingRequests, verificationRequest)
        : new InboundVerification(this.outgoingRequests, verificationRequest);

      onVerificationRequest(verificationFlow);
    }
  }

  async requestDeviceVerification(
    userId: string,
    deviceId: string,
    supportedMethods: VerificationMethod[],
  ): Promise<OutboundVerification> {
    const device = await this.olmMachine.getDevice(
      new UserId(userId),
      new DeviceId(deviceId),
    );

    if (!device) {
      throw new Error(
        `Failed to request verification, no device found for deviceId: ${deviceId}`,
      );
    }

    try {
      const [verificationRequest, toDeviceRequest] =
        await device.requestVerification(
          supportedMethods.map((method) => verificationMethodToRust(method)),
        );

      await this.outgoingRequests.send(toDeviceRequest);

      const verificationFlow = new OutboundVerification(
        this.outgoingRequests,
        verificationRequest,
      );
      return verificationFlow;
    } finally {
      device.free();
    }
  }
  // TODO: request dm verification
}
