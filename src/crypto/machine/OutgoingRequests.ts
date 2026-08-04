import {
  OlmMachine,
  OutgoingRequest,
  UserId,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequestSender } from "./OutgoingRequestSender";
import { MatrixRequestRetrier } from "../../utils";
import { AsyncTaskQueue } from "../../utils";

/**
 * Handles processing of outgoing Matrix crypto requests produced by `OlmMachine`.
 *
 * All requests are executed sequentially through `AsyncTaskQueue`
 * to prevent concurrent processing of outgoing crypto operations.
 *
 * Responsibilities:
 * - Retry rate-limited HTTP requests
 * - Mark requests as sent after successful completion
 */
export class OutgoingRequests {
  private readonly olmMachine: OlmMachine;
  private readonly sender: OutgoingRequestSender;
  private readonly retrier: MatrixRequestRetrier;

  /**
   * Serializes outgoing crypto request processing.
   */
  private readonly queue = new AsyncTaskQueue();

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
   * Sends a single outgoing Matrix crypto request.
   *
   * If the request succeeds, it is marked as sent in the `OlmMachine`
   * so it will not be retried again.
   *
   * @param request Outgoing crypto request to process.
   * @returns Response of network request.
   */
  private async process(request: OutgoingRequest): Promise<Response> {
    const response = await this.retrier.execute(() =>
      this.sender.send(request),
    );

    const respText = await response.clone().text();

    if (response.ok && request.id) {
      await this.olmMachine.markRequestAsSent(
        request.id,
        request.type,
        respText,
      );
    }

    return response;
  }

  private async processBestEffort(request: OutgoingRequest): Promise<void> {
    try {
      await this.process(request);
    } catch (e) {
      console.error(`OutgoingRequests: ${e}`);
    }
  }

  async send(request: OutgoingRequest): Promise<Response> {
    return this.queue.enqueue(async () => await this.process(request));
  }

  async sendMultiple(requests: OutgoingRequest[]): Promise<void> {
    await this.queue.enqueue(async () => {
      for (const request of requests) {
        await this.processBestEffort(request);
      }
    });
  }

  /**
   * Fetches and processes all pending OlmMachine requests sequentially.
   * Waits for everything already in the chain so the snapshot is taken
   * after prior markRequestAsSent calls have completed — preventing
   * the duplicate-send race.
   */
  async processAll(): Promise<void> {
    await this.queue.enqueue(async () => {
      const requests = await this.olmMachine.outgoingRequests();

      for (const request of requests) {
        await this.processBestEffort(request);
      }
    });
  }

  /**
   * Claims missing Olm sessions for the provided users.
   * This triggers a `/keys/claim` request if missing sessions exist.
   *
   * @param users Matrix user IDs requiring missing sessions.
   */
  async claimKeys(users: string[]): Promise<void> {
    return this.queue.enqueue(async () => {
      const request = await this.olmMachine.getMissingSessions(
        users.map((userId) => new UserId(userId)),
      );

      if (request) {
        await this.processBestEffort(request);
      }
    });
  }

  /**
   * Query device keys for the given Matrix users.
   * Request by preparing `/keys/query` request and
   * feed it to `olmMachine`
   *
   * @param users Matrix user IDs whose device keys should be queried.
   */
  async queryKeys(users: string[]): Promise<void> {
    const request = this.olmMachine.queryKeysForUsers(
      users.map((userId) => new UserId(userId)),
    );

    await this.queue.enqueue(async () => {
      await this.processBestEffort(request);
    });
  }
}
