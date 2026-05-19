import {
  KeysBackupRequest,
  KeysClaimRequest,
  KeysQueryRequest,
  KeysUploadRequest,
  OutgoingRequest,
  RoomMessageRequest,
  SignatureUploadRequest,
  ToDeviceRequest,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { MatrixRequest } from "../../matrix-request";
import {
  postClaim,
  postQuery,
  postSignaturesUpload,
  postUpload,
} from "../../api/matrix/client/v3/keys";
import { putSendToDevice } from "../../api/matrix/client/v3/sendToDevice";
import { putSend } from "../../api/matrix/client/v3/rooms";
import { putKeys } from "../../api/matrix/client/v3/roomKeys";

export class OutgoingRequestSender {
  private readonly request: MatrixRequest;
  private readonly abortSignal?: AbortSignal;

  constructor(request: MatrixRequest, abortSignal: AbortSignal) {
    this.request = request;
    this.abortSignal = abortSignal;
  }

  /**
   * Dispatches an outgoing Matrix request to the appropriate request handler
   * based on its runtime type.
   *
   * Some requests may:
   * - be rate limited by the homeserver.
   *
   * Callers are responsible for inspecting the returned `Response`
   * and handling retry or error flows as needed.
   *
   * Supported request types:
   * - `KeysUploadRequest`
   * - `KeysQueryRequest`
   * - `KeysClaimRequest`
   * - `ToDeviceRequest`
   * - `SignatureUploadRequest`
   * - `RoomMessageRequest`
   * - `KeysBackupRequest`
   *
   * @param outgoingRequest - The request to dispatch.
   *
   * @returns A `Response` if the request type is recognized and dispatched.
   *
   * @throws Error
   * Propagates unexpected request or transport, serialization, or network errors
   * thrown by the underlying request handlers.
   */
  async send(outgoingRequest: OutgoingRequest): Promise<Response> {
    if (outgoingRequest instanceof KeysUploadRequest) {
      return this.sendKeysUploadRequest(outgoingRequest);
    }
    if (outgoingRequest instanceof KeysQueryRequest) {
      return this.sendKeysQueryRequest(outgoingRequest);
    }
    if (outgoingRequest instanceof KeysClaimRequest) {
      return this.sendKeysClaimRequest(outgoingRequest);
    }
    if (outgoingRequest instanceof ToDeviceRequest) {
      return this.sendToDeviceRequest(outgoingRequest);
    }
    if (outgoingRequest instanceof SignatureUploadRequest) {
      return this.sendSignatureUploadRequest(outgoingRequest);
    }
    if (outgoingRequest instanceof RoomMessageRequest) {
      return this.sendRoomMessageRequest(outgoingRequest);
    }
    if (outgoingRequest instanceof KeysBackupRequest) {
      return this.sendKeysBackupRequest(outgoingRequest);
    }

    throw new Error(`Unsupported outgoing request type: ${outgoingRequest}`);
  }

  private sendKeysUploadRequest(r: KeysUploadRequest): Promise<Response> {
    return this.request(
      postUpload({ body: JSON.parse(r.body) }),
      this.abortSignal,
    );
  }

  private sendKeysQueryRequest(r: KeysQueryRequest) {
    return this.request(
      postQuery({ body: JSON.parse(r.body) }),
      this.abortSignal,
    );
  }

  private sendKeysClaimRequest(r: KeysQueryRequest) {
    return this.request(
      postClaim({ body: JSON.parse(r.body) }),
      this.abortSignal,
    );
  }

  private sendToDeviceRequest(r: ToDeviceRequest) {
    return this.request(
      putSendToDevice({
        pathParams: {
          eventType: r.event_type,
          txnId: r.txn_id,
        },
        body: JSON.parse(r.body),
      }),
      this.abortSignal,
    );
  }

  private sendSignatureUploadRequest(r: SignatureUploadRequest) {
    return this.request(
      postSignaturesUpload({
        body: JSON.parse(r.body),
      }),
      this.abortSignal,
    );
  }

  private sendRoomMessageRequest(r: RoomMessageRequest) {
    return this.request(
      putSend({
        pathParams: {
          roomId: r.room_id,
          eventType: r.event_type,
          txnId: r.txn_id,
        },
        body: JSON.parse(r.body),
      }),
      this.abortSignal,
    );
  }

  private sendKeysBackupRequest(r: KeysBackupRequest) {
    return this.request(
      putKeys({
        searchParams: { version: r.version },
        body: JSON.parse(r.body),
      }),
      this.abortSignal,
    );
  }
}
