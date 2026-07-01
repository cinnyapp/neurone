import { OlmMachine, SecretsBundle } from "@matrix-org/matrix-sdk-crypto-wasm";

export class Secrets {
  private readonly olmMachine: OlmMachine;

  constructor(olmMachine: OlmMachine) {
    this.olmMachine = olmMachine;
  }

  async exportBundle(): Promise<unknown> {
    const bundle = await this.olmMachine.exportSecretsBundle();
    const secrets = bundle.to_json();
    return secrets;
  }

  async importBundle(secretJson: unknown): Promise<void> {
    const bundle = SecretsBundle.from_json(secretJson);
    await this.olmMachine.importSecretsBundle(bundle);
  }

  async getFromInbox(secretName: string): Promise<Set<string>> {
    const secrets = this.olmMachine.getSecretsFromInbox(secretName);
    return secrets;
  }

  async deleteFromInbox(secretName: string): Promise<void> {
    await this.olmMachine.deleteSecretsFromInbox(secretName);
  }

  async pushSecretToVerifiedDevices(name: string): Promise<void> {
    await this.olmMachine.pushSecretToVerifiedDevices(name);
  }

  async requestMissingSecretsIfNeeded(): Promise<boolean> {
    return await this.olmMachine.requestMissingSecretsIfNeeded();
  }
}
