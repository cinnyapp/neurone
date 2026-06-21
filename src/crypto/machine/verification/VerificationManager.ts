import {
  DeviceId,
  EventId,
  OlmMachine,
  OtherUserIdentity,
  RoomId,
  UserId,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { ClientEventWithoutRoomId, ToDeviceEvent } from "../../../api/types";
import { OutgoingRequests } from "../OutgoingRequests";
import { VerificationMethod } from "./types";
import { verificationMethodToRust } from "./utils";
import { OutboundVerification } from "./OutboundVerification";
import { InboundVerification } from "./InboundVerification";
import { MatrixRequest, parseMatrixResp } from "../../../matrix-request";
import { putSend, PutSendOK } from "../../../api/matrix/client/v3/rooms";
import { randomString } from "../../../utils";

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

      return new OutboundVerification(
        this.outgoingRequests,
        verificationRequest,
      );
    } finally {
      device.free();
    }
  }

  async requestDMVerification(
    userId: string,
    roomId: string,
    supportedMethods: VerificationMethod[],
    matrixRequest: MatrixRequest,
  ): Promise<OutboundVerification> {
    const userIdentity = await this.olmMachine.getIdentity(new UserId(userId));

    if (!(userIdentity instanceof OtherUserIdentity)) {
      throw new Error("User identity not found!");
    }

    try {
      const methods = supportedMethods.map((method) =>
        verificationMethodToRust(method),
      );
      const content = JSON.parse(
        await userIdentity.verificationRequestContent(methods),
      );
      const txnId = randomString(16);

      const response = await matrixRequest(
        putSend({
          pathParams: {
            roomId,
            eventType: "m.room.message",
            txnId,
          },
          body: content,
        }),
      );

      const [err, result] = await parseMatrixResp<PutSendOK>(response);
      if (err) {
        throw err;
      }

      const request = await userIdentity.requestVerification(
        new RoomId(roomId),
        new EventId(result.event_id),
        methods,
      );

      return new OutboundVerification(this.outgoingRequests, request);
    } finally {
      userIdentity.free();
    }
  }
}
