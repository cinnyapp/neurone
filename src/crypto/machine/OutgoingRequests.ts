import {
  EncryptionSettings,
  OlmMachine,
  OutgoingRequest,
  RoomId,
  ToDeviceRequest,
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
   * Failed requests are logged and safely ignored to avoid blocking
   * subsequent queued operations.
   *
   * @param request Outgoing crypto request to process.
   */
  private async process(request: OutgoingRequest): Promise<void> {
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

  async send(request: OutgoingRequest): Promise<void> {
    return this.queue.enqueue(async () => {
      await this.process(request);
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
        await this.process(request);
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
        await this.process(request);
      }
    });
  }

  /**
   * Shares the room encryption key with the provided users.
   *
   * This generates one or more to-device requests required for
   * securely distributing the Megolm session key to devices that
   * do not yet have it.
   *
   * @param roomId Matrix room ID whose encryption keys should be shared.
   * @param users Matrix user IDs that should receive the room keys.
   */
  async shareRoomKeys(roomId: string, users: string[]): Promise<void> {
    return this.queue.enqueue(async () => {
      const requests: ToDeviceRequest[] = await this.olmMachine.shareRoomKey(
        new RoomId(roomId),
        users.map((userId) => new UserId(userId)),
        // TODO: implement encryption settings
        new EncryptionSettings(),
      );
      if (!Array.isArray(requests)) return;

      for (const request of requests) {
        await this.process(request);
      }
    });
  }
}
