import { Sas } from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequests } from "../OutgoingRequests";
import { ObservableValue } from "../../../utils/observable";

export type SasEmoji = {
  emoji: string;
  description: string;
};

export class SasMethod {
  private readonly outgoingRequests: OutgoingRequests;
  private readonly sas: Sas;

  private readonly publishKey = Math.random().toString();

  public readonly stage: ObservableValue<
    SasStartStage | SasAcceptStage | SasDoneState | SasCancelState
  >;

  constructor(outgoingRequests: OutgoingRequests, sas: Sas) {
    this.outgoingRequests = outgoingRequests;
    this.sas = sas;

    this.stage = new ObservableValue(this.getStage(), this.publishKey);

    const weakThis = new globalThis.WeakRef(this);
    this.sas.registerChangesCallback(async () => weakThis.deref()?.onChange());
  }

  private getStage():
    | SasStartStage
    | SasAcceptStage
    | SasDoneState
    | SasCancelState {
    if (this.sas.isCancelled()) {
      return new SasCancelState(this.outgoingRequests, this.sas);
    }
    if (this.sas.isDone()) {
      return new SasDoneState(this.outgoingRequests, this.sas);
    }

    if (this.sas.hasBeenAccepted()) {
      return new SasAcceptStage(this.outgoingRequests, this.sas);
    }

    return new SasStartStage(this.outgoingRequests, this.sas);
  }

  private onChange(): void {
    this.stage.publish(this.publishKey, this.getStage());
  }
}

export class SasStage {
  protected outgoingRequests: OutgoingRequests;
  protected readonly sas: Sas;

  constructor(outgoingRequests: OutgoingRequests, sas: Sas) {
    this.outgoingRequests = outgoingRequests;
    this.sas = sas;
  }
}

export class SasStartStage extends SasStage {
  async accept(): Promise<void> {
    const request = await this.sas.accept();

    if (request) {
      await this.outgoingRequests.send(request);
    }
  }

  async cancel(): Promise<void> {
    const request = await this.sas.cancel();

    if (request) {
      await this.outgoingRequests.send(request);
    }
  }
}

export class SasAcceptStage extends SasStage {
  get emoji(): SasEmoji[] | undefined {
    const emoji = this.sas.emoji();

    if (!emoji) {
      return undefined;
    }

    return emoji.map((e) => ({
      emoji: e.symbol,
      description: e.description,
    }));
  }

  get decimals(): number[] | undefined {
    const decimals = this.sas.decimals();

    if (!decimals || decimals.length !== 3) {
      return undefined;
    }

    return [decimals[0], decimals[1], decimals[2]];
  }

  async match(): Promise<void> {
    const requests = await this.sas.confirm();

    if (requests) {
      await this.outgoingRequests.sendMultiple(requests);
    }
  }

  async mismatch(): Promise<void> {
    const request = this.sas.cancelWithCode("m.mismatched_sas");
    if (request) {
      this.outgoingRequests.send(request);
    }
  }

  async cancel(): Promise<void> {
    const request = await this.sas.cancel();

    if (request) {
      await this.outgoingRequests.send(request);
    }
  }
}

export class SasDoneState extends SasStage {}
export class SasCancelState extends SasStage {
  get code(): string {
    return this.sas.cancelInfo()?.cancelCode() ?? "m.user";
  }

  get reason(): string {
    return this.sas.cancelInfo()?.reason() ?? "m.user";
  }
}
