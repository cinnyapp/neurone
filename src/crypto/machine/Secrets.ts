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
