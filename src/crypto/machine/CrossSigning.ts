import { OlmMachine } from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequests } from "./OutgoingRequests";

export type CrossSigningStatus = {
  master: boolean;
  self: boolean;
  user: boolean;
};

export type CrossSigningKeys = {
  master?: string;
  self?: string;
  user?: string;
};

export class CrossSigning {
  private readonly olmMachine: OlmMachine;

  private readonly outgoingRequests: OutgoingRequests;

  constructor(olmMachine: OlmMachine, outgoingRequests: OutgoingRequests) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = outgoingRequests;
  }

  async getStatus(): Promise<CrossSigningStatus> {
    const status = await this.olmMachine.crossSigningStatus();

    return {
      master: status.hasMaster,
      self: status.hasSelfSigning,
      user: status.hasUserSigning,
    };
  }

  async exportKeys(): Promise<CrossSigningKeys | undefined> {
    const keys = await this.olmMachine.exportCrossSigningKeys();
    return {
      master: keys?.masterKey,
      self: keys?.self_signing_key,
      user: keys?.userSigningKey,
    };
  }

  async importKeys(keys: CrossSigningKeys): Promise<CrossSigningStatus> {
    const status = await this.olmMachine.importCrossSigningKeys(
      keys.master,
      keys.self,
      keys.user,
    );

    return {
      master: status.hasMaster,
      self: status.hasSelfSigning,
      user: status.hasUserSigning,
    };
  }

  async bootstrapCrossSigning(
    uploadSigningKeys: (body: string) => Promise<void>,
  ) {
    const {
      uploadKeysRequest,
      uploadSignaturesRequest,
      uploadSigningKeysRequest,
    } = await this.olmMachine.bootstrapCrossSigning(true);

    if (uploadKeysRequest) {
      await this.outgoingRequests.send(uploadKeysRequest);
    }

    await uploadSigningKeys(uploadSigningKeysRequest.body);

    await this.outgoingRequests.send(uploadSignaturesRequest);
  }
}
