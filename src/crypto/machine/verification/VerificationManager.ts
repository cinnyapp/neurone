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
  EventId,
  OlmMachine,
  OtherUserIdentity,
  OwnUserIdentity,
  RoomId,
  RoomMessageRequest,
  UserId,
  VerificationRequest,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { ClientEventWithoutRoomId, ToDeviceEvent } from "../../../api/types";
import { OutgoingRequests } from "../OutgoingRequests";
import { VerificationMethod } from "./types";
import { verificationMethodToRust } from "./utils";
import { OutboundVerification } from "./OutboundVerification";
import { InboundVerification } from "./InboundVerification";
import { parseMatrixResp } from "../../../matrix-request";
import { PutSendOK } from "../../../api/matrix/client/v3/rooms";
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

  private verificationFlow(
    verificationRequest: VerificationRequest,
  ): OutboundVerification | InboundVerification {
    return verificationRequest.weStarted()
      ? new OutboundVerification(this.outgoingRequests, verificationRequest)
      : new InboundVerification(this.outgoingRequests, verificationRequest);
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
        onVerificationRequest(this.verificationFlow(verificationRequest));
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
      onVerificationRequest(this.verificationFlow(verificationRequest));
    }
  }

  async requestVerification(
    myUserId: string,
    supportedMethods: VerificationMethod[],
  ): Promise<OutboundVerification | InboundVerification> {
    const userIdentity = await this.olmMachine.getIdentity(
      new UserId(myUserId),
    );
    if (!(userIdentity instanceof OwnUserIdentity)) {
      throw new Error("Failed to find own user identity!");
    }

    try {
      const [verificationRequest, toDeviceRequest] =
        await userIdentity.requestVerification(
          supportedMethods.map((method) => verificationMethodToRust(method)),
        );

      await this.outgoingRequests.send(toDeviceRequest);

      return this.verificationFlow(verificationRequest);
    } finally {
      userIdentity.free();
    }
  }

  async requestDeviceVerification(
    userId: string,
    deviceId: string,
    supportedMethods: VerificationMethod[],
  ): Promise<OutboundVerification | InboundVerification> {
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
      const [verificationRequest, toDeviceRequest] = device.requestVerification(
        supportedMethods.map((method) => verificationMethodToRust(method)),
      );

      await this.outgoingRequests.send(toDeviceRequest);

      return this.verificationFlow(verificationRequest);
    } finally {
      device.free();
    }
  }

  async requestDMVerification(
    userId: string,
    roomId: string,
    supportedMethods: VerificationMethod[],
  ): Promise<OutboundVerification | InboundVerification> {
    const userIdentity = await this.olmMachine.getIdentity(new UserId(userId));

    if (!(userIdentity instanceof OtherUserIdentity)) {
      throw new Error("User identity not found!");
    }

    try {
      const methods = supportedMethods.map((method) =>
        verificationMethodToRust(method),
      );
      const content = userIdentity.verificationRequestContent(methods);
      const txnId = randomString(16);
      const requestId = randomString(16);

      const response = await this.outgoingRequests.send(
        new RoomMessageRequest(
          requestId,
          roomId,
          txnId,
          "m.room.message",
          content,
        ),
      );

      const [err, result] = await parseMatrixResp<PutSendOK>(response);
      if (err) {
        throw err;
      }

      const verificationRequest = userIdentity.requestVerification(
        new RoomId(roomId),
        new EventId(result.event_id),
        methods,
      );

      return this.verificationFlow(verificationRequest);
    } finally {
      userIdentity.free();
    }
  }
}
