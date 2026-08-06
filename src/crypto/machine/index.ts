import {
  DeviceId,
  initAsync,
  OlmMachine,
  UserId,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import anotherjson from "another-json";
import { OutgoingRequestSender } from "./OutgoingRequestSender";
import { OutgoingRequests } from "./OutgoingRequests";
import { MatrixRequestRetrier } from "../../utils";
import { MachineEvents } from "./MachineEvents";
import { CrossSigning } from "./CrossSigning";
import { RoomEncryption } from "./RoomEncryption";
import { RoomKeys } from "./RoomKeys";
import { Secrets } from "./Secrets";
import { SyncChanges } from "./SyncChanges";
import { VerificationManager } from "./verification";
import { UserTracker } from "./user";
import { BackupManager } from "./backup";
import { SignedObject } from "./types";

export * from "./CrossSigning";
export * from "./MachineEvents";
export * from "./OutgoingRequests";
export * from "./OutgoingRequestSender";
export * from "./RoomEncryption";
export * from "./RoomKeys";
export * from "./Secrets";
export * from "./SyncChanges";
export * from "./types";
export * from "./utils";
export * as user from "./user";
export * as verification from "./verification";
export * as backup from "./backup";

export class Machine {
  private readonly olmMachine: OlmMachine;

  public readonly outgoingRequests: OutgoingRequests;

  public readonly crossSigning: CrossSigning;

  public readonly roomEncryption: RoomEncryption;

  public readonly roomKeys: RoomKeys;

  public readonly secrets: Secrets;

  public readonly syncChanges: SyncChanges;

  public readonly events: MachineEvents;

  public readonly verificationManager: VerificationManager;

  public readonly userTracker: UserTracker;

  public readonly backupManager: BackupManager;

  static async init(
    userId: string,
    deviceId: string,
    storeName: string,
  ): Promise<{
    olmMachine: OlmMachine;
    closeMachine: () => void;
  }> {
    await initAsync();

    const olmMachine = await OlmMachine.initialize(
      new UserId(userId),
      new DeviceId(deviceId),
      storeName,
    );

    olmMachine.roomKeyRequestsEnabled = false;

    const closeMachine = () => olmMachine.close();

    return {
      olmMachine,
      closeMachine,
    };
  }

  constructor(
    olmMachine: OlmMachine,
    outgoingSender: OutgoingRequestSender,
    retrier: MatrixRequestRetrier,
  ) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = new OutgoingRequests(
      olmMachine,
      outgoingSender,
      retrier,
    );
    this.crossSigning = new CrossSigning(
      this.olmMachine,
      this.outgoingRequests,
    );
    this.roomEncryption = new RoomEncryption(this.olmMachine);
    this.roomKeys = new RoomKeys(this.olmMachine, this.outgoingRequests);
    this.secrets = new Secrets(this.olmMachine);
    this.syncChanges = new SyncChanges(this.olmMachine);
    this.verificationManager = new VerificationManager(
      this.olmMachine,
      this.outgoingRequests,
    );
    this.userTracker = new UserTracker(this.olmMachine, this.outgoingRequests);
    this.backupManager = new BackupManager(
      this.olmMachine,
      this.outgoingRequests,
    );
    this.events = new MachineEvents(this.olmMachine);
  }

  get creationTs(): number {
    return this.olmMachine.deviceCreationTimeMs;
  }

  getEncryptionKey(): string {
    return this.olmMachine.identityKeys.curve25519.toBase64();
  }

  getSigningKey(): string {
    return this.olmMachine.identityKeys.ed25519.toBase64();
  }

  /**
   * Signs a Matrix object using the local Olm machine.
   *
   * The Matrix signing algorithm requires the `signatures` and `unsigned`
   * properties to be excluded from the canonical JSON before signing. This
   * method temporarily removes those fields, computes the signature, and then
   * restores them.
   *
   * If the object already contains signatures for the local user, the newly
   * generated signatures are merged with the existing ones.
   *
   * @param obj - The object to sign. It is modified in place.
   */
  async sign<T extends SignedObject>(obj: T): Promise<void> {
    const signatures = new Map(Object.entries(obj.signatures ?? {}));
    const unsigned = obj.unsigned;

    delete obj.signatures;
    delete obj.unsigned;

    const userId = this.olmMachine.userId.toString();
    const existingUserSignatures = signatures.get(userId) ?? {};

    const canonicalJson = anotherjson.stringify(obj);
    const signed = await this.olmMachine.sign(canonicalJson);

    const newSignatures = JSON.parse(signed.asJSON()) as Record<
      string,
      Record<string, string>
    >;

    signatures.set(userId, {
      ...existingUserSignatures,
      ...(newSignatures[userId] ?? {}),
    });

    if (unsigned !== undefined) {
      obj.unsigned = unsigned;
    }

    obj.signatures = Object.fromEntries(signatures);
  }
}
