import {
  VerificationRequest,
  VerificationRequestPhase,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import {
  CancelableVerificationStage,
  CancelVerificationStage,
  DoneVerificationStage,
  ReadyVerificationStage,
  StartVerificationStage,
  VerificationFlow,
} from "./VerificationFlow";
import { VerificationMethod } from "./types";
import { verificationMethodFromRust, verificationMethodToRust } from "./utils";
import { ObservableValue } from "../../../utils/observable";
import { OutgoingRequests } from "../OutgoingRequests";

export class InboundVerification extends VerificationFlow {
  private readonly publishKey = Math.random().toString();

  public readonly stage: ObservableValue<
    | InboundRequestStage
    | ReadyVerificationStage
    | StartVerificationStage
    | DoneVerificationStage
    | CancelVerificationStage
  >;

  constructor(
    outgoingRequests: OutgoingRequests,
    verificationRequest: VerificationRequest,
  ) {
    super(outgoingRequests, verificationRequest);

    this.stage = new ObservableValue(this.getStage(), this.publishKey);

    // use weak ref as no unregister callback is available
    const weakThis = new globalThis.WeakRef(this);
    verificationRequest.registerChangesCallback(async () => {
      weakThis.deref()?.onChange();
    });
  }

  private getStage():
    | InboundRequestStage
    | ReadyVerificationStage
    | StartVerificationStage
    | DoneVerificationStage
    | CancelVerificationStage {
    const phase = this.verificationRequest.phase();
    switch (phase) {
      case VerificationRequestPhase.Created:
      case VerificationRequestPhase.Requested:
        return new InboundRequestStage(
          this.outgoingRequests,
          this.verificationRequest,
        );
      case VerificationRequestPhase.Ready:
        return new ReadyVerificationStage(
          this.outgoingRequests,
          this.verificationRequest,
        );
      case VerificationRequestPhase.Transitioned:
        return new StartVerificationStage(
          this.outgoingRequests,
          this.verificationRequest,
        );
      case VerificationRequestPhase.Done:
        return new DoneVerificationStage(
          this.outgoingRequests,
          this.verificationRequest,
        );
      case VerificationRequestPhase.Cancelled:
        return new CancelVerificationStage(
          this.outgoingRequests,
          this.verificationRequest,
        );
      default:
        return new CancelVerificationStage(
          this.outgoingRequests,
          this.verificationRequest,
        );
    }
  }

  private onChange(): void {
    this.stage.publish(this.publishKey, this.getStage());
  }
}

export class InboundRequestStage extends CancelableVerificationStage {
  get methods(): VerificationMethod[] {
    return (
      this.verificationRequest.ourSupportedMethods?.map((method) =>
        verificationMethodFromRust(method),
      ) ?? []
    );
  }

  async ready(supportedMethods: VerificationMethod[]): Promise<void> {
    const request = this.verificationRequest.acceptWithMethods(
      supportedMethods.map((method) => verificationMethodToRust(method)),
    );

    if (request) {
      await this.outgoingRequests.send(request);
    }
  }
}
