import { OlmMachine } from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequestSender } from "./OutgoingRequestSender";
import { MatrixRequestRetrier } from "../../utils";

export class OutgoingRequests {
  private readonly olmMachine: OlmMachine;
  private readonly sender: OutgoingRequestSender;
  private readonly retrier: MatrixRequestRetrier;

  constructor(
    olmMachine: OlmMachine,
    sender: OutgoingRequestSender,
    retrier: MatrixRequestRetrier,
  ) {
    this.olmMachine = olmMachine;
    this.sender = sender;
    this.retrier = retrier;
  }

  /**
   * Send all outgoing request from `OlmMachine`
   * and mark them as sent if valid response is received.
   */
  async process(): Promise<void> {
    const requests = await this.olmMachine.outgoingRequests();

    for (const request of requests) {
      try {
        const response = await this.retrier.execute(() =>
          this.sender.send(request),
        );

        const respText = await response.text();

        if (!response.ok) {
          throw new Error(`${request.type} is not OK. ${respText}`);
        }

        if (request.id) {
          await this.olmMachine.markRequestAsSent(
            request.id,
            request.type,
            respText,
          );
        }
      } catch (e) {
        console.error(`MachineOutgoingRequest: ${e}`);
      }
    }
  }
}
