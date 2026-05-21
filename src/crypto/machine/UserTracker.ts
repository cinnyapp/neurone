import { OlmMachine, UserId } from "@matrix-org/matrix-sdk-crypto-wasm";

export class UserTracker {
  private readonly olmMachine: OlmMachine;

  constructor(olmMachine: OlmMachine) {
    this.olmMachine = olmMachine;
  }

  /**
   * @param users User IDs whose devices need to be tracked for encryption
   */
  async trackUsers(users: string[]): Promise<void> {
    await this.olmMachine.updateTrackedUsers(
      users.map((userId) => new UserId(userId)),
    );
  }
}
