import { Sas, VerificationRequest } from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequests } from "../OutgoingRequests";
import { verificationMethodFromRust } from "./utils";
import { VerificationMethod } from "./types";
import { SasMethod } from "./SasMethod";

export class VerificationFlow {
  protected readonly outgoingRequests: OutgoingRequests;
  protected readonly verificationRequest: VerificationRequest;

  public constructor(
    outgoingRequests: OutgoingRequests,
    verificationRequest: VerificationRequest,
  ) {
    this.outgoingRequests = outgoingRequests;
    this.verificationRequest = verificationRequest;
  }

  get id(): string {
    return this.verificationRequest.flowId;
  }

  get roomId(): string | undefined {
    return this.verificationRequest.roomId?.toString();
  }

  get timeout(): number | undefined {
    return this.verificationRequest.timeRemainingMillis() ?? undefined;
  }

  get timedOut(): boolean {
    return this.verificationRequest.timedOut();
  }

  get otherUserId(): string {
    return this.verificationRequest.otherUserId.toString();
  }

  get selfVerification(): boolean {
    return this.verificationRequest.isSelfVerification();
  }
}

export class VerificationStage {
  protected readonly outgoingRequests: OutgoingRequests;
  protected readonly verificationRequest: VerificationRequest;

  constructor(
    outgoingRequests: OutgoingRequests,
    verificationRequest: VerificationRequest,
  ) {
    this.outgoingRequests = outgoingRequests;
    this.verificationRequest = verificationRequest;
  }

  get id(): string {
    return this.verificationRequest.flowId;
  }
}

export class CancelableVerificationStage extends VerificationStage {
  async cancel(): Promise<void> {
    const request = this.verificationRequest.cancel();
    if (request) {
      await this.outgoingRequests.send(request);
    }
  }
}

export class ReadyVerificationStage extends CancelableVerificationStage {
  get methods(): VerificationMethod[] {
    return (
      this.verificationRequest.theirSupportedMethods?.map((method) =>
        verificationMethodFromRust(method),
      ) ?? []
    );
  }

  async startSas(): Promise<void> {
    const data = await this.verificationRequest.startSas();
    if (!data) return;

    const [, request] = data;
    if (request) {
      await this.outgoingRequests.send(request);
    }
  }
}

export class StartVerificationStage extends CancelableVerificationStage {
  get method(): SasMethod | undefined {
    const method = this.verificationRequest.getVerification();
    if (method instanceof Sas) {
      return new SasMethod(this.outgoingRequests, method);
    }

    return undefined;
  }
}

export class DoneVerificationStage extends VerificationStage {}

export class CancelVerificationStage extends VerificationStage {
  get code(): string {
    return this.verificationRequest.cancelInfo?.cancelCode() ?? "m.user";
  }

  get reason(): string {
    return this.verificationRequest.cancelInfo?.reason() ?? "m.user";
  }
}
